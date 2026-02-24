import postgres from "postgres";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/travel_alsace";

const sql = postgres(DATABASE_URL);

async function migrate() {
  console.log("Running migrations...");

  await sql`
    CREATE TABLE IF NOT EXISTS pois (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      name_he TEXT,
      category TEXT NOT NULL,
      subcategory TEXT,
      lat DECIMAL(10,7) NOT NULL,
      lng DECIMAL(10,7) NOT NULL,
      description TEXT,
      description_he TEXT,
      rating DECIMAL(2,1),
      visit_duration_min INT,
      address TEXT,
      phone TEXT,
      website TEXT,
      opening_hours JSONB,
      price_range TEXT,
      wine_varieties TEXT[],
      food_specialties TEXT[],
      images TEXT[],
      tags TEXT[],
      must_see BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS itineraries (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      start_date DATE,
      end_date DATE,
      share_token TEXT UNIQUE,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS itinerary_stops (
      id SERIAL PRIMARY KEY,
      itinerary_id INT REFERENCES itineraries(id) ON DELETE CASCADE,
      poi_id INT REFERENCES pois(id),
      day_number INT NOT NULL,
      order_index INT NOT NULL,
      notes TEXT,
      visit_duration_min INT
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id SERIAL PRIMARY KEY,
      poi_id INT REFERENCES pois(id) ON DELETE CASCADE,
      visited BOOLEAN DEFAULT false,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT now(),
      UNIQUE(poi_id)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id SERIAL PRIMARY KEY,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  // Indexes
  await sql`CREATE INDEX IF NOT EXISTS idx_pois_category ON pois(category)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_pois_lat_lng ON pois(lat, lng)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_itinerary_stops_itinerary ON itinerary_stops(itinerary_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_bookmarks_poi ON bookmarks(poi_id)`;

  console.log("Migrations complete!");
  // Only close connection if running standalone
  if (process.argv[1]?.includes('migrate')) {
    await sql.end();
  }
}

export { migrate };

// Run directly if this is the main module
const isMain = process.argv[1]?.includes('migrate');
if (isMain) {
  migrate().catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  });
}
