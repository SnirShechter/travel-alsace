import { useState } from "react";
import { useLang } from "../hooks/useLang";
import { t } from "../i18n/translations";
import type { POI } from "../lib/api";
import AddToItinerary from "./AddToItinerary";

interface Props {
  poi: POI;
  onClose: () => void;
  onBookmark: (poiId: number) => Promise<void>;
}

export default function POIDetail({ poi, onClose, onBookmark }: Props) {
  const { lang } = useLang();
  const [showAddToItinerary, setShowAddToItinerary] = useState(false);
  const [bookmarking, setBookmarking] = useState(false);

  const name = lang === "he" && poi.name_he ? poi.name_he : poi.name;
  const desc = lang === "he" && poi.description_he ? poi.description_he : poi.description;

  const handleBookmark = async () => {
    setBookmarking(true);
    try {
      await onBookmark(poi.id);
    } finally {
      setBookmarking(false);
    }
  };

  const handleNavigate = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${poi.lat},${poi.lng}`,
      "_blank"
    );
  };

  const durationText = poi.visit_duration_min
    ? poi.visit_duration_min >= 60
      ? `${Math.round(poi.visit_duration_min / 60)} ${t("poi.hours", lang)}`
      : `${poi.visit_duration_min} ${t("poi.minutes", lang)}`
    : null;

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 z-[1001] bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] max-h-[60vh] overflow-y-auto animate-slide-up">
        {/* Drag handle */}
        <div className="flex justify-center pt-2 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 rtl:left-auto rtl:right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          ✕
        </button>

        <div className="px-5 pb-5 pt-2">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {poi.must_see && (
                  <span className="px-2 py-0.5 bg-gold/20 text-gold-light text-xs rounded-full font-medium">
                    {t("poi.mustSee", lang)}
                  </span>
                )}
                {poi.price_range && (
                  <span className="text-xs text-gray-500">{poi.price_range}</span>
                )}
              </div>
              <h2 className="text-xl font-bold text-wine">{name}</h2>
              {lang === "he" && poi.name !== poi.name_he && (
                <p className="text-sm text-gray-400 mt-0.5">{poi.name}</p>
              )}
            </div>
            {poi.rating && (
              <div className="flex items-center gap-1 bg-wine/10 px-2 py-1 rounded-lg">
                <span className="text-sm">⭐</span>
                <span className="text-sm font-semibold text-wine">{poi.rating}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {desc && <p className="text-sm text-gray-600 leading-relaxed mb-3">{desc}</p>}

          {/* Meta */}
          <div className="flex flex-wrap gap-2 mb-4">
            {durationText && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-cream rounded-lg text-xs text-gray-600">
                🕐 {t("poi.duration", lang)}: {durationText}
              </span>
            )}
            {poi.address && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-cream rounded-lg text-xs text-gray-600">
                📍 {poi.address}
              </span>
            )}
          </div>

          {/* Wine varieties */}
          {poi.wine_varieties && poi.wine_varieties.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {poi.wine_varieties.map((v) => (
                  <span
                    key={v}
                    className="px-2 py-0.5 bg-sage/10 text-sage text-xs rounded-full"
                  >
                    🍇 {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Food specialties */}
          {poi.food_specialties && poi.food_specialties.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {poi.food_specialties.map((f) => (
                  <span
                    key={f}
                    className="px-2 py-0.5 bg-gold/10 text-gold text-xs rounded-full"
                  >
                    🍽️ {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleNavigate}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-wine text-white rounded-xl font-medium text-sm hover:bg-wine-dark transition-colors"
            >
              🧭 {t("map.navigate", lang)}
            </button>
            <button
              onClick={handleBookmark}
              disabled={bookmarking}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gold/20 text-gold rounded-xl font-medium text-sm hover:bg-gold/30 transition-colors"
            >
              ⭐ {t("poi.bookmark", lang)}
            </button>
            <button
              onClick={() => setShowAddToItinerary(true)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-sage/20 text-sage rounded-xl font-medium text-sm hover:bg-sage/30 transition-colors"
            >
              📋
            </button>
          </div>

          {/* Website */}
          {poi.website && (
            <a
              href={poi.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-center text-sm text-wine underline"
            >
              🌐 {t("poi.website", lang)}
            </a>
          )}
        </div>
      </div>

      {showAddToItinerary && (
        <AddToItinerary
          poi={poi}
          onClose={() => setShowAddToItinerary(false)}
        />
      )}
    </>
  );
}
