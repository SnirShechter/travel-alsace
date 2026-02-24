import { useState, useEffect } from "react";
import { LangContext } from "./hooks/useLang";
import type { Lang } from "./i18n/translations";
import { t } from "./i18n/translations";
import MapPage from "./pages/MapPage";
import ItineraryPage from "./pages/ItineraryPage";
import GuidePage from "./pages/GuidePage";
import BookmarksPage from "./pages/BookmarksPage";
import AssistantPage from "./pages/AssistantPage";

type Tab = "map" | "assistant" | "itinerary" | "guide" | "bookmarks";

const TAB_ICONS: Record<Tab, string> = {
  map: "🗺️",
  assistant: "🤖",
  itinerary: "📋",
  guide: "🍷",
  bookmarks: "⭐",
};

const TAB_KEYS: Record<Tab, `nav.${string}`> = {
  map: "nav.map",
  assistant: "nav.assistant",
  itinerary: "nav.itinerary",
  guide: "nav.guide",
  bookmarks: "nav.bookmarks",
};

export default function App() {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "en" ? "en" : "he") as Lang;
  });
  const [tab, setTab] = useState<Tab>("map");

  const dir = lang === "he" ? "rtl" : "ltr";

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [dir, lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, dir }}>
      <div className="flex flex-col h-dvh overflow-hidden" dir={dir}>
        {/* Header */}
        <header className="bg-wine text-white px-4 py-2 flex items-center justify-between shrink-0 shadow-md z-10">
          <h1 className="text-lg font-bold tracking-wide">
            {lang === "he" ? "🍷 דרך היין" : "🍷 Wine Route"}
          </h1>
          <button
            onClick={() => setLang(lang === "he" ? "en" : "he")}
            className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium hover:bg-white/30 transition-colors"
          >
            {lang === "he" ? "EN" : "עב"}
          </button>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-hidden relative">
          {tab === "map" && <MapPage />}
          {tab === "assistant" && <AssistantPage />}
          {tab === "itinerary" && <ItineraryPage />}
          {tab === "guide" && <GuidePage />}
          {tab === "bookmarks" && <BookmarksPage />}
        </main>

        {/* Bottom navigation */}
        <nav className="bg-white border-t border-cream-dark flex shrink-0 safe-bottom shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-10">
          {(Object.keys(TAB_ICONS) as Tab[]).map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
                tab === key
                  ? "text-wine font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="text-xl">{TAB_ICONS[key]}</span>
              <span className="text-[10px] leading-tight">
                {t(TAB_KEYS[key] as any, lang)}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </LangContext.Provider>
  );
}
