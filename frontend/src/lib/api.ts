const BASE = "/api";

async function request<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export interface POI {
  id: number;
  name: string;
  name_he: string | null;
  category: string;
  subcategory: string | null;
  lat: number;
  lng: number;
  description: string | null;
  description_he: string | null;
  rating: number | null;
  visit_duration_min: number | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  opening_hours: Record<string, string> | null;
  price_range: string | null;
  wine_varieties: string[] | null;
  food_specialties: string[] | null;
  images: string[] | null;
  tags: string[] | null;
  must_see: boolean;
  created_at: string;
}

export interface Itinerary {
  id: number;
  name: string;
  start_date: string | null;
  end_date: string | null;
  share_token: string | null;
  stop_count?: number;
  stops?: ItineraryStop[];
  created_at: string;
}

export interface ItineraryStop {
  id: number;
  itinerary_id: number;
  poi_id: number;
  day_number: number;
  order_index: number;
  notes: string | null;
  visit_duration_min: number | null;
  // Joined POI fields
  name: string;
  name_he: string | null;
  category: string;
  lat: number;
  lng: number;
  poi_duration: number | null;
  description: string | null;
  description_he: string | null;
}

export interface Bookmark {
  id: number;
  poi_id: number;
  visited: boolean;
  notes: string | null;
  created_at: string;
  // Joined POI fields
  name: string;
  name_he: string | null;
  category: string;
  subcategory: string | null;
  lat: number;
  lng: number;
  description: string | null;
  description_he: string | null;
  rating: number | null;
  visit_duration_min: number | null;
  price_range: string | null;
  must_see: boolean;
}

// POIs
export const fetchPois = (params?: Record<string, string>) => {
  const qs = params ? "?" + new URLSearchParams(params).toString() : "";
  return request<POI[]>(`/pois${qs}`);
};

export const fetchPoi = (id: number) => request<POI>(`/pois/${id}`);

// Itineraries
export const fetchItineraries = () => request<Itinerary[]>("/itineraries");

export const fetchItinerary = (id: number) => request<Itinerary>(`/itineraries/${id}`);

export const createItinerary = (data: { name: string; start_date?: string; end_date?: string }) =>
  request<Itinerary>("/itineraries", { method: "POST", body: JSON.stringify(data) });

export const addStop = (
  itineraryId: number,
  data: { poi_id: number; day_number: number; notes?: string }
) =>
  request<ItineraryStop>(`/itineraries/${itineraryId}/stops`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const reorderStops = (
  itineraryId: number,
  stops: { id: number; day_number: number; order_index: number }[]
) =>
  request(`/itineraries/${itineraryId}/stops/reorder`, {
    method: "PUT",
    body: JSON.stringify({ stops }),
  });

export const removeStop = (itineraryId: number, stopId: number) =>
  request(`/itineraries/${itineraryId}/stops/${stopId}`, { method: "DELETE" });

// Bookmarks
export const fetchBookmarks = () => request<Bookmark[]>("/bookmarks");

export const toggleBookmark = (poiId: number) =>
  request<{ bookmarked: boolean }>("/bookmarks", {
    method: "POST",
    body: JSON.stringify({ poi_id: poiId }),
  });

export const updateBookmark = (id: number, data: { visited?: boolean; notes?: string }) =>
  request<Bookmark>(`/bookmarks/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteBookmark = (id: number) =>
  request(`/bookmarks/${id}`, { method: "DELETE" });
