import { useState, useRef } from "react";
import { useLang } from "../hooks/useLang";
import { t } from "../i18n/translations";
import { useApi } from "../hooks/useApi";
import {
  fetchItineraries,
  removeStop,
  reorderStops,
  type Itinerary,
  type ItineraryStop,
} from "../lib/api";

export default function ItineraryPage() {
  const { lang } = useLang();
  const [activeDay, setActiveDay] = useState(1);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const { data: itineraries, loading, refetch } = useApi(async () => {
    const list = await fetchItineraries();
    if (list.length > 0) {
      // Fetch the first itinerary with stops
      const res = await fetch(`/api/itineraries/${list[0].id}`);
      const full = await res.json();
      setItinerary(full);
    }
    return list;
  }, []);

  const days = Array.from({ length: 10 }, (_, i) => i + 1);

  const stopsForDay = (itinerary?.stops || [])
    .filter((s) => s.day_number === activeDay)
    .sort((a, b) => a.order_index - b.order_index);

  const handleRemove = async (stopId: number) => {
    if (!itinerary) return;
    await removeStop(itinerary.id, stopId);
    await refetch();
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = async () => {
    if (
      dragItem.current === null ||
      dragOverItem.current === null ||
      !itinerary
    )
      return;

    const items = [...stopsForDay];
    const [draggedItem] = items.splice(dragItem.current, 1);
    items.splice(dragOverItem.current, 0, draggedItem);

    // Update order
    const reordered = items.map((item, idx) => ({
      id: item.id,
      day_number: activeDay,
      order_index: idx,
    }));

    await reorderStops(itinerary.id, reordered);

    dragItem.current = null;
    dragOverItem.current = null;
    await refetch();
  };

  const handleNavigate = (stop: ItineraryStop) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`,
      "_blank"
    );
  };

  const formatDate = (dayNum: number) => {
    const baseDate = new Date("2026-04-14");
    baseDate.setDate(baseDate.getDate() + dayNum - 1);
    return baseDate.toLocaleDateString(lang === "he" ? "he-IL" : "en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="h-full overflow-y-auto bg-cream">
      <div className="px-4 py-4">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-wine">
              {t("itin.title", lang)}
            </h2>
            <p className="text-sm text-gray-500">{t("itin.tripDates", lang)}</p>
          </div>
        </div>

        {/* Day tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-4 no-scrollbar">
          {days.map((day) => {
            const dayStops = (itinerary?.stops || []).filter(
              (s) => s.day_number === day
            );
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`flex flex-col items-center min-w-[60px] px-3 py-2 rounded-xl text-sm transition-all ${
                  activeDay === day
                    ? "bg-wine text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-cream-dark"
                }`}
              >
                <span className="font-bold">{day}</span>
                <span className="text-[10px] opacity-75">
                  {dayStops.length > 0 ? `${dayStops.length} 📍` : "—"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Day header */}
        <div className="mb-3 px-1">
          <h3 className="text-sm font-medium text-gray-500">
            {formatDate(activeDay)} · {t("itin.day", lang)} {activeDay}
          </h3>
        </div>

        {/* Stops list */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">
            {t("general.loading", lang)}
          </div>
        ) : stopsForDay.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-400">{t("itin.noStops", lang)}</p>
            <p className="text-xs text-gray-300 mt-1">
              {t("itin.dragHint", lang)}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {stopsForDay.map((stop, index) => {
              const name =
                lang === "he" && stop.name_he ? stop.name_he : stop.name;
              const duration =
                stop.visit_duration_min || stop.poi_duration || 60;

              return (
                <div
                  key={stop.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className="bg-white rounded-xl p-3 shadow-sm border border-cream-dark flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all hover:shadow-md"
                >
                  {/* Order number */}
                  <div className="w-7 h-7 bg-wine text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                      <span>🕐 {duration} {t("poi.minutes", lang)}</span>
                      <span className="capitalize">{stop.category}</span>
                    </div>
                    {stop.notes && (
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        💬 {stop.notes}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => handleNavigate(stop)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-cream hover:bg-cream-dark text-sm"
                      title={t("map.navigate", lang)}
                    >
                      🧭
                    </button>
                    <button
                      onClick={() => handleRemove(stop.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-sm"
                      title={t("itin.removeStop", lang)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
