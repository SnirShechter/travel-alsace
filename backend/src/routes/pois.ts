import { Hono } from "hono";
import { sql } from "../db/connection.js";

const app = new Hono();

// GET /api/pois - List all POIs with optional filters
app.get("/", async (c) => {
  const category = c.req.query("category");
  const mustSee = c.req.query("must_see");
  const search = c.req.query("search");

  let query = sql`SELECT * FROM pois WHERE 1=1`;

  if (category) {
    query = sql`SELECT * FROM pois WHERE category = ${category}`;
    if (mustSee === "true") {
      query = sql`SELECT * FROM pois WHERE category = ${category} AND must_see = true`;
    }
  } else if (mustSee === "true") {
    query = sql`SELECT * FROM pois WHERE must_see = true`;
  } else if (search) {
    query = sql`SELECT * FROM pois WHERE
      name ILIKE ${"%" + search + "%"} OR
      name_he ILIKE ${"%" + search + "%"} OR
      description ILIKE ${"%" + search + "%"} OR
      description_he ILIKE ${"%" + search + "%"}`;
  } else {
    query = sql`SELECT * FROM pois`;
  }

  const pois = await query;
  return c.json(pois);
});

// GET /api/pois/:id - Get single POI
app.get("/:id", async (c) => {
  const id = c.req.param("id");
  const [poi] = await sql`SELECT * FROM pois WHERE id = ${id}`;
  if (!poi) return c.json({ error: "POI not found" }, 404);
  return c.json(poi);
});

// GET /api/pois/categories/summary - Get category counts
app.get("/categories/summary", async (c) => {
  const counts = await sql`
    SELECT category, COUNT(*)::int as count
    FROM pois
    GROUP BY category
    ORDER BY count DESC
  `;
  return c.json(counts);
});

export default app;
