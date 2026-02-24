export type Lang = "he" | "en";

const translations = {
  // Navigation
  "nav.map": { he: "מפה", en: "Map" },
  "nav.assistant": { he: "אסיסטנט", en: "Assistant" },
  "nav.itinerary": { he: "המסלול שלי", en: "My Itinerary" },
  "nav.guide": { he: "מדריך", en: "Guide" },
  "nav.bookmarks": { he: "מועדפים", en: "Bookmarks" },

  // Categories
  "cat.village": { he: "כפרים", en: "Villages" },
  "cat.winery": { he: "יקבים", en: "Wineries" },
  "cat.restaurant": { he: "מסעדות", en: "Restaurants" },
  "cat.viewpoint": { he: "תצפיות", en: "Viewpoints" },
  "cat.accommodation": { he: "לינה", en: "Accommodation" },
  "cat.parking": { he: "חניה", en: "Parking" },
  "cat.all": { he: "הכל", en: "All" },

  // Map
  "map.title": { he: "דרך היין של אלזס", en: "Alsace Wine Route" },
  "map.search": { he: "חיפוש מקום...", en: "Search place..." },
  "map.filter": { he: "סינון", en: "Filter" },
  "map.mustSee": { he: "חובה לראות", en: "Must See" },
  "map.navigate": { he: "נווט לכאן", en: "Navigate here" },

  // POI Popup
  "poi.duration": { he: "זמן ביקור", en: "Visit time" },
  "poi.minutes": { he: "דקות", en: "min" },
  "poi.hours": { he: "שעות", en: "hours" },
  "poi.bookmark": { he: "שמור למועדפים", en: "Bookmark" },
  "poi.bookmarked": { he: "במועדפים", en: "Bookmarked" },
  "poi.addToDay": { he: "הוסף למסלול", en: "Add to itinerary" },
  "poi.website": { he: "אתר", en: "Website" },
  "poi.mustSee": { he: "חובה!", en: "Must see!" },

  // Itinerary
  "itin.title": { he: "המסלול שלי", en: "My Itinerary" },
  "itin.day": { he: "יום", en: "Day" },
  "itin.addStop": { he: "הוסף תחנה", en: "Add stop" },
  "itin.noStops": { he: "אין תחנות ביום זה", en: "No stops on this day" },
  "itin.dragHint": { he: "גרור לשינוי סדר", en: "Drag to reorder" },
  "itin.removeStop": { he: "הסר", en: "Remove" },
  "itin.notes": { he: "הערות", en: "Notes" },
  "itin.share": { he: "שתף מסלול", en: "Share itinerary" },
  "itin.tripDates": { he: "14-23 באפריל 2026", en: "April 14-23, 2026" },
  "itin.selectDay": { he: "בחר יום", en: "Select day" },

  // Bookmarks
  "bm.title": { he: "מועדפים", en: "Bookmarks" },
  "bm.visited": { he: "ביקרנו", en: "Visited" },
  "bm.notVisited": { he: "טרם ביקרנו", en: "Not visited" },
  "bm.empty": { he: "אין מועדפים עדיין", en: "No bookmarks yet" },
  "bm.addNote": { he: "הוסף הערה...", en: "Add a note..." },
  "bm.markVisited": { he: "סמן כביקרנו", en: "Mark as visited" },
  "bm.all": { he: "הכל", en: "All" },

  // Guide
  "guide.title": { he: "מדריך", en: "Guide" },
  "guide.wine": { he: "יינות אלזס", en: "Alsace Wines" },
  "guide.food": { he: "אוכל אלזסי", en: "Alsatian Food" },
  "guide.tips": { he: "טיפים", en: "Tips" },
  "guide.wineIntro": {
    he: "אלזס מייצרת בעיקר יינות לבנים יבשים ממגוון זנים ייחודיים. דרך היין באורך 170 ק\"מ חוצה כ-51 אזורי Grands Crus.",
    en: "Alsace primarily produces dry white wines from a range of unique varieties. The 170km Wine Route passes through 51 Grand Cru areas.",
  },
  "guide.foodIntro": {
    he: "המטבח האלזסי משלב השפעות צרפתיות וגרמניות — עשיר, מנחם ומלא טעמים. הנה המאכלים שחובה לנסות.",
    en: "Alsatian cuisine blends French and German influences — rich, comforting, and full of flavor. Here are the must-try dishes.",
  },

  // Assistant
  "ai.title": { he: "אסיסטנט מסע", en: "Travel Assistant" },
  "ai.placeholder": {
    he: "שאל אותי על אלזס...",
    en: "Ask me about Alsace...",
  },
  "ai.comingSoon": {
    he: "אסיסטנט ה-AI יהיה זמין בקרוב. בינתיים, עיינו במדריך היינות והאוכל!",
    en: "AI assistant coming soon. In the meantime, check out the wine and food guide!",
  },

  // General
  "general.loading": { he: "טוען...", en: "Loading..." },
  "general.error": { he: "שגיאה", en: "Error" },
  "general.offline": { he: "מצב לא מקוון", en: "Offline mode" },
  "general.save": { he: "שמור", en: "Save" },
  "general.cancel": { he: "ביטול", en: "Cancel" },
  "general.delete": { he: "מחק", en: "Delete" },
  "general.close": { he: "סגור", en: "Close" },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key]?.[lang] || key;
}

export default translations;
