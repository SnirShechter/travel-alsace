import { useState } from "react";
import { useLang } from "../hooks/useLang";
import { t } from "../i18n/translations";
import { addStop, fetchItineraries, type POI } from "../lib/api";
import { useApi } from "../hooks/useApi";

interface Props {
  poi: POI;
  onClose: () => void;
}

export default function AddToItinerary({ poi, onClose }: Props) {
  const { lang } = useLang();
  const [selectedDay, setSelectedDay] = useState(1);
  const [saving, setSaving] = useState(false);

  const { data: itineraries } = useApi(fetchItineraries, []);

  const handleAdd = async () => {
    if (!itineraries || itineraries.length === 0) return;
    setSaving(true);
    try {
      await addStop(itineraries[0].id, {
        poi_id: poi.id,
        day_number: selectedDay,
      });
      onClose();
    } catch (err) {
      console.error("Failed to add stop:", err);
    } finally {
      setSaving(false);
    }
  };

  const days = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="fixed inset-0 z-[2000] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl w-full max-w-lg p-5 animate-slide-up">
        <h3 className="text-lg font-bold text-wine mb-4">
          {t("poi.addToDay", lang)}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {lang === "he" && poi.name_he ? poi.name_he : poi.name}
        </p>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            {t("itin.selectDay", lang)}
          </label>
          <div className="grid grid-cols-5 gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDay === day
                    ? "bg-wine text-white"
                    : "bg-cream text-gray-600 hover:bg-cream-dark"
                }`}
              >
                {t("itin.day", lang)} {day}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
          >
            {t("general.cancel", lang)}
          </button>
          <button
            onClick={handleAdd}
            disabled={saving}
            className="flex-1 py-2.5 bg-wine text-white rounded-xl text-sm font-medium hover:bg-wine-dark disabled:opacity-50"
          >
            {saving ? "..." : t("general.save", lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
