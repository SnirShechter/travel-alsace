import { Hono } from "hono";
import { sql } from "../db/connection.js";

const app = new Hono();

// GET /api/bookmarks - List all bookmarks with POI data
app.get("/", async (c) => {
  const bookmarks = await sql`
    SELECT b.*, p.name, p.name_he, p.category, p.subcategory,
           p.lat, p.lng, p.description, p.description_he,
           p.rating, p.visit_duration_min, p.price_range, p.must_see
    FROM bookmarks b
    JOIN pois p ON p.id = b.poi_id
    ORDER BY b.created_at DESC
  `;
  return c.json(bookmarks);
});

// POST /api/bookmarks - Toggle bookmark
app.post("/", async (c) => {
  const body = await c.req.json();
  const poiId = body.poi_id;

  // Check if already bookmarked
  const [existing] = await sql`SELECT id FROM bookmarks WHERE poi_id = ${poiId}`;

  if (existing) {
    await sql`DELETE FROM bookmarks WHERE id = ${existing.id}`;
    return c.json({ bookmarked: false });
  }

  const [bookmark] = await sql`
    INSERT INTO bookmarks (poi_id) VALUES (${poiId})
    RETURNING *
  `;
  return c.json({ bookmarked: true, ...bookmark }, 201);
});

// PUT /api/bookmarks/:id - Update (visited, notes)
app.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const updates: Record<string, unknown> = {};
  if (body.visited !== undefined) updates.visited = body.visited;
  if (body.notes !== undefined) updates.notes = body.notes;

  const [bookmark] = await sql`
    UPDATE bookmarks
    SET visited = COALESCE(${body.visited ?? null}, visited),
        notes = COALESCE(${body.notes ?? null}, notes)
    WHERE id = ${id}
    RETURNING *
  `;
  if (!bookmark) return c.json({ error: "Bookmark not found" }, 404);
  return c.json(bookmark);
});

// DELETE /api/bookmarks/:id
app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await sql`DELETE FROM bookmarks WHERE id = ${id}`;
  return c.json({ ok: true });
});

export default app;
