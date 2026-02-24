import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import path from "path";
import { existsSync } from "fs";

import { migrate } from "./db/migrate.js";
import { seed } from "./db/seed.js";
import poisRoutes from "./routes/pois.js";
import itinerariesRoutes from "./routes/itineraries.js";
import bookmarksRoutes from "./routes/bookmarks.js";

const app = new Hono();

// CORS for development
app.use("/api/*", cors());

// API routes
app.route("/api/pois", poisRoutes);
app.route("/api/itineraries", itinerariesRoutes);
app.route("/api/bookmarks", bookmarksRoutes);

// AI chat placeholder
app.post("/api/chat", async (c) => {
  return c.json({
    message: "AI chat is not yet configured. Please add your API key to enable the assistant.",
    placeholder: true,
  });
});

// Health check
app.get("/api/health", (c) => c.json({ status: "ok", timestamp: new Date().toISOString() }));

// Serve frontend static files in production
const frontendDist = path.resolve(process.cwd(), "frontend/dist");
if (existsSync(frontendDist)) {
  app.use("/*", serveStatic({ root: "./frontend/dist" }));
  // SPA fallback
  app.get("*", serveStatic({ root: "./frontend/dist", path: "index.html" }));
}

const port = parseInt(process.env.PORT || "3000");

// Run migrations and seed on startup
async function startup() {
  try {
    await migrate();
    console.log("Migrations complete");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }

  try {
    await seed();
    console.log("Seed complete");
  } catch (err) {
    // Seed may fail on duplicate key (already seeded) — that's OK
    console.log("Seed skipped (likely already seeded):", (err as Error).message?.slice(0, 100));
  }

  serve({ fetch: app.fetch, port }, (info) => {
    console.log(`Server running at http://localhost:${info.port}`);
  });
}

startup();
