import postgres from "postgres";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/travel_alsace";

export const sql = postgres(DATABASE_URL);
