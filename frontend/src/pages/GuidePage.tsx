import { useState } from "react";
import { useLang } from "../hooks/useLang";
import { t } from "../i18n/translations";

type Section = "wine" | "food" | "tips";

const WINE_VARIETIES = [
  {
    name: "Riesling",
    name_he: "ריזלינג",
    emoji: "🍏",
    color: "from-green-50 to-yellow-50",
    desc_en:
      "The king of Alsatian wines. Bone-dry, mineral, and age-worthy. Aromas of citrus, white flowers, and petrol with age. Pairs beautifully with seafood, Choucroute, and Asian cuisine.",
    desc_he:
      "מלך יינות אלזס. יבש לחלוטין, מינרלי ומתאים ליישון. ארומות של הדרים, פרחים לבנים ודלק עם התבגרות. נפלא עם פירות ים, שוקרוט ומטבח אסייתי.",
    grands_crus: ["Schlossberg", "Rangen", "Brand", "Sommerberg"],
  },
  {
    name: "Gewürztraminer",
    name_he: "גוורצטרמינר",
    emoji: "🌹",
    color: "from-pink-50 to-orange-50",
    desc_en:
      "Intensely aromatic and exotic. Notes of lychee, rose, ginger, and spice. From dry to sweet, always bold and perfumed. The perfect match for Munster cheese and spicy dishes.",
    desc_he:
      "ארומטי ואקזוטי בעוצמה. תווי ליצ'י, ורד, ג'ינג'ר ותבלינים. מיבש ועד מתוק, תמיד נועז ומבושם. השידוך המושלם לגבינת מינסטר ומנות חריפות.",
    grands_crus: ["Hengst", "Goldert", "Mambourg", "Sporen"],
  },
  {
    name: "Pinot Gris",
    name_he: "פינו גרי",
    emoji: "🍑",
    color: "from-amber-50 to-yellow-50",
    desc_en:
      "Full-bodied and rich, the most opulent of Alsace's whites. Smoky notes with ripe stone fruit flavors. Excellent with foie gras, pork dishes, and rich sauces.",
    desc_he:
      "מלא גוף ועשיר, הגרנדיוזי ביותר מהלבנים של אלזס. תווים מעושנים עם טעמי פרי גלעין בשל. מצוין עם פואה גרא, מנות חזיר ורטבים עשירים.",
    grands_crus: ["Rangen", "Altenberg de Bergheim", "Furstentum"],
  },
  {
    name: "Muscat d'Alsace",
    name_he: "מוסקט דאלזס",
    emoji: "🍇",
    color: "from-green-50 to-emerald-50",
    desc_en:
      "Unlike sweet Muscats elsewhere, Alsatian Muscat is dry and crisp. Tastes exactly like biting into a fresh grape. The perfect aperitif wine. Rare and special.",
    desc_he:
      "בניגוד למוסקט המתוק ממקומות אחרים, מוסקט אלזסי הוא יבש וחד. טעם כמו נגיסה בענב טרי. יין אפריטיף מושלם. נדיר ומיוחד.",
    grands_crus: ["Goldert", "Hatschbourg"],
  },
  {
    name: "Pinot Blanc",
    name_he: "פינו בלאן",
    emoji: "🌼",
    color: "from-yellow-50 to-lime-50",
    desc_en:
      "The everyday wine of Alsace. Soft, round, and approachable with apple and pear flavors. Great value. Also the base for most Crémant d'Alsace sparkling wine.",
    desc_he:
      "יין היומיום של אלזס. רך, עגול ונגיש עם טעמי תפוח ואגס. ערך מצוין. גם הבסיס לרוב יין התוסס Crémant d'Alsace.",
    grands_crus: [],
  },
  {
    name: "Pinot Noir",
    name_he: "פינו נואר",
    emoji: "🍒",
    color: "from-red-50 to-rose-50",
    desc_en:
      "The only red wine of Alsace. Light to medium-bodied with cherry and raspberry flavors. Quality has improved dramatically in recent years. Try oak-aged versions for more structure.",
    desc_he:
      "היין האדום היחיד של אלזס. קל עד בינוני גוף עם טעמי דובדבן ופטל. האיכות השתפרה דרמטית בשנים האחרונות. נסו גרסאות מיושנות בחביות לעוד מבנה.",
    grands_crus: [],
  },
  {
    name: "Sylvaner",
    name_he: "סילוונר",
    emoji: "🌿",
    color: "from-emerald-50 to-green-50",
    desc_en:
      "Light, fresh, and herbal. Once the most planted variety, now a hidden gem. Excellent with lighter Alsatian fare and salads. Grand Cru Zotzenberg is the finest expression.",
    desc_he:
      "קל, רענן וצמחי. פעם הזן הנפוץ ביותר, היום פנינה נסתרת. מצוין עם מאכלים אלזסיים קלים וסלטים. Grand Cru Zotzenberg הוא הביטוי המשובח ביותר.",
    grands_crus: ["Zotzenberg"],
  },
];

const FOOD_ITEMS = [
  {
    name: "Tarte Flambée",
    name_he: "טארט פלמבה (פלמקוכ)",
    emoji: "🔥",
    desc_en:
      "Alsace's answer to pizza — thin, crispy dough topped with crème fraîche, onions, and lardons (smoked bacon). Traditionally baked in a wood-fired oven. Available in many varieties including Munster cheese, mushroom, and sweet versions with apple and cinnamon.",
    desc_he:
      'ה"פיצה" האלזסית — בצק דק ופריך מכוסה שמנת, בצל ולרדון (בייקון מעושן). נאפית באופן מסורתי בתנור עצים. זמינה בווריאציות רבות כולל גבינת מינסטר, פטריות וגם גרסה מתוקה עם תפוחים וקינמון.',
    tip_en: "Order multiple varieties to share — they come fast and are best eaten fresh!",
    tip_he: "הזמינו כמה סוגים לשתף — הן מגיעות מהר והכי טעימות כשהן חמות!",
  },
  {
    name: "Choucroute Garnie",
    name_he: "שוקרוט גארני",
    emoji: "🥬",
    desc_en:
      "Alsace's signature dish — sauerkraut (fermented cabbage) cooked in Riesling or Sylvaner, topped with an impressive array of sausages, smoked pork, and potatoes. A hearty, generous mountain of flavor.",
    desc_he:
      "המנה הסמלית של אלזס — כרוב כבוש מבושל בריזלינג או סילוונר, מעוטר במערך מרשים של נקניקיות, חזיר מעושן ותפוחי אדמה. הר של טעם שופע ונדיב.",
    tip_en: "Share between two — portions are enormous. Pair with a crisp Riesling.",
    tip_he: "חלקו בין שניים — המנות ענקיות. שלבו עם ריזלינג חד.",
  },
  {
    name: "Baeckeoffe",
    name_he: "בקאוף",
    emoji: "🍲",
    desc_en:
      "A slow-cooked casserole of three meats (beef, pork, lamb) layered with potatoes and onions, marinated overnight in white wine. Baked in a sealed ceramic dish. The name means 'baker's oven'.",
    desc_he:
      "תבשיל איטי של שלושה בשרים (בקר, חזיר, כבש) בשכבות עם תפוחי אדמה ובצל, מושרים לילה שלם ביין לבן. נאפה בכלי חרס חתום. השם פירושו \"תנור האופה\".",
    tip_en: "Must be ordered 24 hours in advance — ask your restaurant the day before.",
    tip_he: "חובה להזמין 24 שעות מראש — שאלו את המסעדה ביום הקודם.",
  },
  {
    name: "Munster",
    name_he: "מינסטר",
    emoji: "🧀",
    desc_en:
      "A soft, pungent washed-rind cheese from the Vosges mountains. Strong aroma but wonderfully creamy texture. Traditionally served with cumin seeds and a glass of Gewürztraminer.",
    desc_he:
      "גבינה רכה חזקה בעלת קליפה שטופה מהרי הווז'. ריח חזק אך מרקם שמנתי נפלא. מוגשת באופן מסורתי עם זרעי כמון וכוס גוורצטרמינר.",
    tip_en: "Don't let the smell scare you — it's much milder than it smells!",
    tip_he: "אל תתנו לריח להפחיד — הוא הרבה יותר עדין ממה שהוא מריח!",
  },
  {
    name: "Kougelhopf",
    name_he: "קוגלהופ",
    emoji: "🍰",
    desc_en:
      "An iconic Alsatian yeast cake baked in a distinctive fluted mold. The sweet version has raisins soaked in kirsch or rum. There's also a savory version with bacon and walnuts — perfect with Crémant.",
    desc_he:
      "עוגת שמרים איקונית של אלזס הנאפית בתבנית מחורצת ייחודית. הגרסה המתוקה כוללת צימוקים מושרים בקירש או רום. יש גם גרסה מלוחה עם בייקון ואגוזים — מושלמת עם קרמן.",
    tip_en: "Buy one from a bakery to take home — they keep well for days.",
    tip_he: "קנו אחת ממאפייה לקחת הביתה — הן נשמרות יפה ימים.",
  },
  {
    name: "Bretzel",
    name_he: "ברצל",
    emoji: "🥨",
    desc_en:
      "The Alsatian pretzel — soft, chewy, with coarse salt. Larger and softer than German pretzels. Found in every bakery. Try the version stuffed with Munster cheese.",
    desc_he:
      "הפרצל האלזסי — רך, לעיס, עם מלח גס. גדול ורך יותר מהפרצלים הגרמניים. נמצא בכל מאפייה. נסו את הגרסה ממולאת בגבינת מינסטר.",
    tip_en: "Perfect for a quick snack while walking through villages.",
    tip_he: "מושלם לנשנוש מהיר תוך כדי סיור בכפרים.",
  },
];

const TIPS = {
  en: [
    { title: "Driving the Wine Route", icon: "🚗", text: "The full route is 170km but don't try to drive it all in one day. Pick a 30-40km section and explore thoroughly. Roads are narrow — drive carefully and watch for tractors!" },
    { title: "Wine Tastings", icon: "🍷", text: "Most domaines offer free tastings (dégustation). It's polite to buy at least one bottle. Typical prices range from €5-30. Spitting is perfectly acceptable. Some require appointments — call ahead for prestigious domaines." },
    { title: "Best Time to Visit", icon: "🌸", text: "April (your trip!) is wonderful — cherry blossoms, spring flowers, vineyards turning green. Less crowded than summer. Markets are active and outdoor dining begins." },
    { title: "Parking", icon: "🅿️", text: "Most villages have free or cheap parking just outside the center. Don't try to drive into the medieval cores — streets are too narrow. Look for 'P' signs at village entrances." },
    { title: "Markets", icon: "🛒", text: "Weekly markets are a highlight. Colmar's indoor market is open daily except Sunday. Check local schedules for outdoor markets in smaller villages." },
    { title: "Language", icon: "💬", text: "French is the main language but many locals speak Alsatian (Germanic dialect) and German. English is widely understood in tourist areas. Learning a few French phrases goes a long way." },
  ],
  he: [
    { title: "נהיגה בדרך היין", icon: "🚗", text: "הדרך המלאה היא 170 ק\"מ אבל אל תנסו לנהוג את כולה ביום אחד. בחרו קטע של 30-40 ק\"מ וחקרו לעומק. הכבישים צרים — נהגו בזהירות ושימו לב לטרקטורים!" },
    { title: "טעימות יין", icon: "🍷", text: "רוב היקבים מציעים טעימות חינם (dégustation). מנומס לקנות לפחות בקבוק אחד. מחירים טיפוסיים €5-30. יריקה זה לגמרי מקובל. חלקם דורשים תיאום מראש — התקשרו מראש ליקבים יוקרתיים." },
    { title: "הזמן הטוב לביקור", icon: "🌸", text: "אפריל (הטיול שלכם!) הוא נהדר — פריחת דובדבנים, פרחי אביב, כרמים שמתחילים להוריק. פחות צפוף מהקיץ. שווקים פעילים וישיבה בחוץ מתחילה." },
    { title: "חניה", icon: "🅿️", text: "לרוב הכפרים יש חניה חינמית או זולה מחוץ למרכז. אל תנסו לנהוג לתוך המרכזים מימי הביניים — הרחובות צרים מדי. חפשו שלטי 'P' בכניסות לכפרים." },
    { title: "שווקים", icon: "🛒", text: "שווקים שבועיים הם דבר מדהים. השוק המקורה של קולמר פתוח כל יום חוץ מיום ראשון. בדקו לוחות זמנים מקומיים לשווקים בכפרים קטנים." },
    { title: "שפה", icon: "💬", text: "צרפתית היא השפה העיקרית אבל הרבה מקומיים מדברים אלזסית (ניב גרמני) וגרמנית. אנגלית מובנת באזורים תיירותיים. ללמוד כמה משפטים בצרפתית עושה הרבה." },
  ],
};

export default function GuidePage() {
  const { lang } = useLang();
  const [section, setSection] = useState<Section>("wine");

  const sections: { key: Section; label: string; icon: string }[] = [
    { key: "wine", label: t("guide.wine", lang), icon: "🍷" },
    { key: "food", label: t("guide.food", lang), icon: "🍽️" },
    { key: "tips", label: t("guide.tips", lang), icon: "💡" },
  ];

  return (
    <div className="h-full overflow-y-auto bg-cream">
      <div className="px-4 py-4">
        {/* Header */}
        <h2 className="text-xl font-bold text-wine mb-4">
          {t("guide.title", lang)}
        </h2>

        {/* Section tabs */}
        <div className="flex gap-2 mb-5">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                section === s.key
                  ? "bg-wine text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-cream-dark"
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Wine Guide */}
        {section === "wine" && (
          <div>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              {t("guide.wineIntro", lang)}
            </p>

            <div className="space-y-4">
              {WINE_VARIETIES.map((wine) => (
                <div
                  key={wine.name}
                  className={`bg-gradient-to-br ${wine.color} rounded-2xl p-4 border border-white/50`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{wine.emoji}</span>
                    <h3 className="text-lg font-bold text-wine">
                      {lang === "he" ? wine.name_he : wine.name}
                    </h3>
                    {lang === "he" && (
                      <span className="text-xs text-gray-400">{wine.name}</span>
                    )}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {lang === "he" ? wine.desc_he : wine.desc_en}
                  </p>

                  {wine.grands_crus.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-gray-500 font-medium">
                        Grands Crus:
                      </span>
                      {wine.grands_crus.map((gc) => (
                        <span
                          key={gc}
                          className="px-2 py-0.5 bg-white/70 rounded-full text-xs text-wine font-medium"
                        >
                          {gc}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Food Guide */}
        {section === "food" && (
          <div>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              {t("guide.foodIntro", lang)}
            </p>

            <div className="space-y-4">
              {FOOD_ITEMS.map((food) => (
                <div
                  key={food.name}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-cream-dark"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{food.emoji}</span>
                    <h3 className="text-lg font-bold text-wine">
                      {lang === "he" ? food.name_he : food.name}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {lang === "he" ? food.desc_he : food.desc_en}
                  </p>

                  <div className="flex items-start gap-2 bg-gold/10 rounded-xl px-3 py-2">
                    <span className="text-sm shrink-0">💡</span>
                    <p className="text-xs text-gold font-medium">
                      {lang === "he" ? food.tip_he : food.tip_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {section === "tips" && (
          <div className="space-y-3">
            {TIPS[lang].map((tip, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-sm border border-cream-dark"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{tip.icon}</span>
                  <h3 className="font-bold text-wine">{tip.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
}
