import { openDB, type IDBPDatabase } from "idb";
import type { POI } from "./api";

const DB_NAME = "travel-alsace";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("pois")) {
          const store = db.createObjectStore("pois", { keyPath: "id" });
          store.createIndex("category", "category");
        }
        if (!db.objectStoreNames.contains("bookmarks")) {
          db.createObjectStore("bookmarks", { keyPath: "poi_id" });
        }
      },
    });
  }
  return dbPromise;
}

export async function cachePois(pois: POI[]) {
  const db = await getDB();
  const tx = db.transaction("pois", "readwrite");
  for (const poi of pois) {
    await tx.store.put(poi);
  }
  await tx.done;
}

export async function getCachedPois(): Promise<POI[]> {
  const db = await getDB();
  return db.getAll("pois");
}

export async function getCachedPoisByCategory(category: string): Promise<POI[]> {
  const db = await getDB();
  return db.getAllFromIndex("pois", "category", category);
}
