import { Hono } from "hono";
import { sql } from "../db/connection.js";
import { nanoid } from "nanoid";

const app = new Hono();

// GET /api/itineraries - List all
app.get("/", async (c) => {
  const itineraries = await sql`
    SELECT i.*, COUNT(s.id)::int as stop_count
    FROM itineraries i
    LEFT JOIN itinerary_stops s ON s.itinerary_id = i.id
    GROUP BY i.id
    ORDER BY i.created_at DESC
  `;
  return c.json(itineraries);
});

// POST /api/itineraries - Create
app.post("/", async (c) => {
  const body = await c.req.json();
  const shareToken = nanoid(12);
  const [itinerary] = await sql`
    INSERT INTO itineraries (name, start_date, end_date, share_token)
    VALUES (${body.name}, ${body.start_date || null}, ${body.end_date || null}, ${shareToken})
    RETURNING *
  `;
  return c.json(itinerary, 201);
});

// GET /api/itineraries/:id - Get with stops
app.get("/:id", async (c) => {
  const id = c.req.param("id");
  const [itinerary] = await sql`SELECT * FROM itineraries WHERE id = ${id}`;
  if (!itinerary) return c.json({ error: "Itinerary not found" }, 404);

  const stops = await sql`
    SELECT s.*, p.name, p.name_he, p.category, p.lat, p.lng,
           p.visit_duration_min as poi_duration, p.description, p.description_he
    FROM itinerary_stops s
    JOIN pois p ON p.id = s.poi_id
    WHERE s.itinerary_id = ${id}
    ORDER BY s.day_number, s.order_index
  `;

  return c.json({ ...itinerary, stops });
});

// GET /api/itineraries/share/:token - Get by share token
app.get("/share/:token", async (c) => {
  const token = c.req.param("token");
  const [itinerary] = await sql`SELECT * FROM itineraries WHERE share_token = ${token}`;
  if (!itinerary) return c.json({ error: "Itinerary not found" }, 404);

  const stops = await sql`
    SELECT s.*, p.name, p.name_he, p.category, p.lat, p.lng,
           p.visit_duration_min as poi_duration, p.description, p.description_he
    FROM itinerary_stops s
    JOIN pois p ON p.id = s.poi_id
    WHERE s.itinerary_id = ${itinerary.id}
    ORDER BY s.day_number, s.order_index
  `;

  return c.json({ ...itinerary, stops });
});

// PUT /api/itineraries/:id - Update
app.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const [itinerary] = await sql`
    UPDATE itineraries
    SET name = COALESCE(${body.name || null}, name),
        start_date = COALESCE(${body.start_date || null}, start_date),
        end_date = COALESCE(${body.end_date || null}, end_date)
    WHERE id = ${id}
    RETURNING *
  `;
  if (!itinerary) return c.json({ error: "Itinerary not found" }, 404);
  return c.json(itinerary);
});

// DELETE /api/itineraries/:id
app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await sql`DELETE FROM itineraries WHERE id = ${id}`;
  return c.json({ ok: true });
});

// === STOPS ===

// POST /api/itineraries/:id/stops - Add stop
app.post("/:id/stops", async (c) => {
  const itineraryId = c.req.param("id");
  const body = await c.req.json();

  // Get max order_index for day
  const [max] = await sql`
    SELECT COALESCE(MAX(order_index), -1)::int as max_idx
    FROM itinerary_stops
    WHERE itinerary_id = ${itineraryId} AND day_number = ${body.day_number}
  `;

  const [stop] = await sql`
    INSERT INTO itinerary_stops (itinerary_id, poi_id, day_number, order_index, notes, visit_duration_min)
    VALUES (${itineraryId}, ${body.poi_id}, ${body.day_number}, ${max.max_idx + 1}, ${body.notes || null}, ${body.visit_duration_min || null})
    RETURNING *
  `;
  return c.json(stop, 201);
});

// PUT /api/itineraries/:id/stops/reorder - Reorder stops
app.put("/:id/stops/reorder", async (c) => {
  const body = await c.req.json();
  // body.stops = [{ id, day_number, order_index }]
  for (const s of body.stops) {
    await sql`
      UPDATE itinerary_stops
      SET day_number = ${s.day_number}, order_index = ${s.order_index}
      WHERE id = ${s.id}
    `;
  }
  return c.json({ ok: true });
});

// PUT /api/itineraries/:itId/stops/:stopId
app.put("/:itId/stops/:stopId", async (c) => {
  const stopId = c.req.param("stopId");
  const body = await c.req.json();
  const [stop] = await sql`
    UPDATE itinerary_stops
    SET notes = COALESCE(${body.notes ?? null}, notes),
        visit_duration_min = COALESCE(${body.visit_duration_min ?? null}, visit_duration_min)
    WHERE id = ${stopId}
    RETURNING *
  `;
  if (!stop) return c.json({ error: "Stop not found" }, 404);
  return c.json(stop);
});

// DELETE /api/itineraries/:itId/stops/:stopId
app.delete("/:itId/stops/:stopId", async (c) => {
  const stopId = c.req.param("stopId");
  await sql`DELETE FROM itinerary_stops WHERE id = ${stopId}`;
  return c.json({ ok: true });
});

export default app;
