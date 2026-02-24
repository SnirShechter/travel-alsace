import { useLang } from "../hooks/useLang";
import { t } from "../i18n/translations";

export default function AssistantPage() {
  const { lang } = useLang();

  const suggestions =
    lang === "he"
      ? [
          "איפה הכי שווה לאכול Tarte Flambée ליד Colmar?",
          "תכנן לי יום של טעימות יין + ארוחת צהריים",
          "מה שווה לראות אם יש לנו רק 3 שעות ב-Riquewihr?",
          "איזה יקבים חובה לבקר?",
          "מה ההבדל בין Riesling ל-Gewürztraminer?",
        ]
      : [
          "Where's the best Tarte Flambée near Colmar?",
          "Plan a day of wine tastings + lunch",
          "What to see with only 3 hours in Riquewihr?",
          "Which wineries are must-visit?",
          "What's the difference between Riesling and Gewürztraminer?",
        ];

  return (
    <div className="h-full overflow-y-auto bg-cream">
      <div className="px-4 py-4 flex flex-col items-center justify-center min-h-full">
        {/* Icon */}
        <div className="text-6xl mb-4">🤖</div>

        {/* Title */}
        <h2 className="text-xl font-bold text-wine mb-2">
          {t("ai.title", lang)}
        </h2>

        {/* Coming soon message */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark max-w-sm text-center mb-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            {t("ai.comingSoon", lang)}
          </p>
        </div>

        {/* Sample questions */}
        <div className="w-full max-w-sm">
          <h3 className="text-sm font-medium text-gray-400 mb-3 text-center">
            {lang === "he" ? "שאלות לדוגמה:" : "Sample questions:"}
          </h3>
          <div className="space-y-2">
            {suggestions.map((q, i) => (
              <div
                key={i}
                className="bg-white rounded-xl px-4 py-3 text-sm text-gray-500 border border-cream-dark opacity-60"
              >
                {q}
              </div>
            ))}
          </div>
        </div>

        {/* Input placeholder */}
        <div className="w-full max-w-sm mt-6">
          <div className="flex gap-2">
            <input
              type="text"
              disabled
              placeholder={t("ai.placeholder", lang)}
              className="flex-1 px-4 py-3 bg-white border border-cream-dark rounded-xl text-sm opacity-60"
            />
            <button
              disabled
              className="px-4 py-3 bg-wine/50 text-white rounded-xl text-sm font-medium opacity-60"
            >
              {lang === "he" ? "שלח" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
