import { useState, useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import { useLang } from "../hooks/useLang";
import { t } from "../i18n/translations";
import { fetchPois, toggleBookmark, type POI } from "../lib/api";
import { cachePois, getCachedPois } from "../lib/db";
import { useApi } from "../hooks/useApi";
import POIDetail from "../components/POIDetail";

const CATEGORY_CONFIG: Record<string, { icon: string; color: string }> = {
  village: { icon: "🏘️", color: "#722F37" },
  winery: { icon: "🍷", color: "#7A8B6F" },
  restaurant: { icon: "🍽️", color: "#C5A55A" },
  viewpoint: { icon: "🏰", color: "#4A90D9" },
  accommodation: { icon: "🏨", color: "#8B6FB0" },
  parking: { icon: "🅿️", color: "#666" },
};

const ALSACE_CENTER: [number, number] = [48.15, 7.35];
const ALSACE_BOUNDS: [[number, number], [number, number]] = [
  [47.9, 7.1],
  [48.55, 7.6],
];

export default function MapPage() {
  const { lang } = useLang();
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mustSeeOnly, setMustSeeOnly] = useState(false);
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const { data: pois, loading } = useApi(async () => {
    try {
      const data = await fetchPois();
      await cachePois(data);
      return data;
    } catch {
      return getCachedPois();
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: ALSACE_CENTER,
      zoom: 11,
      zoomControl: false,
      maxBounds: [
        [47.5, 6.5],
        [49.0, 8.0],
      ],
      minZoom: 9,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://openstreetmap.org">OSM</a>',
      maxZoom: 18,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapRef.current || !markersRef.current || !pois) return;

    markersRef.current.clearLayers();

    const filtered = pois.filter((poi) => {
      if (activeCategory && poi.category !== activeCategory) return false;
      if (mustSeeOnly && !poi.must_see) return false;
      return true;
    });

    filtered.forEach((poi) => {
      const config = CATEGORY_CONFIG[poi.category] || { icon: "📍", color: "#666" };

      const icon = L.divIcon({
        className: "",
        html: `<div class="custom-marker" style="background:${config.color}"><span>${config.icon}</span></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([poi.lat, poi.lng], { icon }).addTo(markersRef.current!);

      marker.on("click", () => {
        setSelectedPoi(poi);
        mapRef.current?.flyTo([poi.lat, poi.lng], 14, { duration: 0.5 });
      });
    });
  }, [pois, activeCategory, mustSeeOnly]);

  const categories = [
    { key: null, label: t("cat.all", lang), icon: "🗺️" },
    { key: "village", label: t("cat.village", lang), icon: "🏘️" },
    { key: "winery", label: t("cat.winery", lang), icon: "🍷" },
    { key: "restaurant", label: t("cat.restaurant", lang), icon: "🍽️" },
    { key: "viewpoint", label: t("cat.viewpoint", lang), icon: "🏰" },
  ];

  const handleFitBounds = useCallback(() => {
    mapRef.current?.fitBounds(ALSACE_BOUNDS, { padding: [20, 20] });
  }, []);

  return (
    <div className="relative h-full">
      {/* Map */}
      <div ref={mapContainerRef} className="absolute inset-0" />

      {/* Category filter chips */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.key ?? "all"}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap shadow-md transition-all ${
              activeCategory === cat.key
                ? "bg-wine text-white shadow-lg"
                : "bg-white/95 text-gray-700 hover:bg-white"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
        <button
          onClick={() => setMustSeeOnly(!mustSeeOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap shadow-md transition-all ${
            mustSeeOnly
              ? "bg-gold text-white shadow-lg"
              : "bg-white/95 text-gray-700 hover:bg-white"
          }`}
        >
          <span>⭐</span>
          <span>{t("map.mustSee", lang)}</span>
        </button>
      </div>

      {/* Fit bounds button */}
      <button
        onClick={handleFitBounds}
        className="absolute bottom-24 right-3 z-[1000] bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-lg hover:bg-cream transition-colors"
        title="Fit to Alsace"
      >
        🎯
      </button>

      {/* Loading indicator */}
      {loading && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[1000] bg-white px-4 py-2 rounded-full shadow-lg text-sm text-gray-600">
          {t("general.loading", lang)}
        </div>
      )}

      {/* POI Detail panel */}
      {selectedPoi && (
        <POIDetail
          poi={selectedPoi}
          onClose={() => setSelectedPoi(null)}
          onBookmark={async (poiId) => {
            await toggleBookmark(poiId);
          }}
        />
      )}
    </div>
  );
}
