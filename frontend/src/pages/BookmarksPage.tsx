import { useState } from "react";
import { useLang } from "../hooks/useLang";
import { t } from "../i18n/translations";
import { useApi } from "../hooks/useApi";
import {
  fetchBookmarks,
  updateBookmark,
  deleteBookmark,
  type Bookmark,
} from "../lib/api";

type Filter = "all" | "visited" | "not_visited";

export default function BookmarksPage() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");

  const { data: bookmarks, loading, refetch } = useApi(fetchBookmarks, []);

  const filtered = (bookmarks || []).filter((b) => {
    if (filter === "visited") return b.visited;
    if (filter === "not_visited") return !b.visited;
    return true;
  });

  const handleToggleVisited = async (bm: Bookmark) => {
    await updateBookmark(bm.id, { visited: !bm.visited });
    await refetch();
  };

  const handleSaveNote = async (bm: Bookmark) => {
    await updateBookmark(bm.id, { notes: noteText });
    setEditingNote(null);
    setNoteText("");
    await refetch();
  };

  const handleDelete = async (bm: Bookmark) => {
    await deleteBookmark(bm.id);
    await refetch();
  };

  const handleNavigate = (bm: Bookmark) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${bm.lat},${bm.lng}`,
      "_blank"
    );
  };

  const visitedCount = (bookmarks || []).filter((b) => b.visited).length;
  const totalCount = (bookmarks || []).length;

  return (
    <div className="h-full overflow-y-auto bg-cream">
      <div className="px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-wine">
              {t("bm.title", lang)}
            </h2>
            {totalCount > 0 && (
              <p className="text-sm text-gray-500">
                {visitedCount}/{totalCount} {t("bm.visited", lang)}
              </p>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4">
          {(
            [
              { key: "all", label: t("bm.all", lang) },
              { key: "not_visited", label: t("bm.notVisited", lang) },
              { key: "visited", label: t("bm.visited", lang) },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                filter === f.key
                  ? "bg-wine text-white"
                  : "bg-white text-gray-600 hover:bg-cream-dark"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Bookmarks list */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">
            {t("general.loading", lang)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">⭐</div>
            <p className="text-gray-400">{t("bm.empty", lang)}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((bm) => {
              const name =
                lang === "he" && bm.name_he ? bm.name_he : bm.name;
              const desc =
                lang === "he" && bm.description_he
                  ? bm.description_he
                  : bm.description;

              return (
                <div
                  key={bm.id}
                  className={`bg-white rounded-xl p-4 shadow-sm border transition-all ${
                    bm.visited
                      ? "border-sage/30 bg-sage/5"
                      : "border-cream-dark"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Visited checkbox */}
                    <button
                      onClick={() => handleToggleVisited(bm)}
                      className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        bm.visited
                          ? "bg-sage border-sage text-white"
                          : "border-gray-300 hover:border-sage"
                      }`}
                    >
                      {bm.visited && "✓"}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-semibold text-sm ${
                            bm.visited ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {name}
                        </h3>
                        {bm.must_see && <span className="text-xs">⭐</span>}
                      </div>

                      {desc && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {desc}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                        <span className="capitalize">{bm.category}</span>
                        {bm.price_range && <span>{bm.price_range}</span>}
                        {bm.rating && <span>⭐ {bm.rating}</span>}
                      </div>

                      {/* Notes */}
                      {editingNote === bm.id ? (
                        <div className="mt-2 flex gap-2">
                          <input
                            type="text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder={t("bm.addNote", lang)}
                            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSaveNote(bm)}
                            className="px-3 py-1.5 bg-wine text-white rounded-lg text-sm"
                          >
                            {t("general.save", lang)}
                          </button>
                        </div>
                      ) : bm.notes ? (
                        <p
                          className="mt-2 text-xs text-gray-600 bg-cream rounded-lg px-2 py-1 cursor-pointer"
                          onClick={() => {
                            setEditingNote(bm.id);
                            setNoteText(bm.notes || "");
                          }}
                        >
                          💬 {bm.notes}
                        </p>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingNote(bm.id);
                            setNoteText("");
                          }}
                          className="mt-2 text-xs text-gray-400 hover:text-gray-600"
                        >
                          + {t("bm.addNote", lang)}
                        </button>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => handleNavigate(bm)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-cream hover:bg-cream-dark text-sm"
                      >
                        🧭
                      </button>
                      <button
                        onClick={() => handleDelete(bm)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-sm"
                      >
                        🗑️
                      </button>
                    </div>
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
