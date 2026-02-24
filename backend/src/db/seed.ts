import postgres from "postgres";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/travel_alsace";

const sql = postgres(DATABASE_URL);

interface POI {
  name: string;
  name_he: string;
  category: string;
  subcategory?: string;
  lat: number;
  lng: number;
  description: string;
  description_he: string;
  rating?: number;
  visit_duration_min?: number;
  address?: string;
  website?: string;
  price_range?: string;
  wine_varieties?: string[];
  food_specialties?: string[];
  tags?: string[];
  must_see?: boolean;
}

const pois: POI[] = [
  // === VILLAGES ===
  {
    name: "Colmar",
    name_he: "קולמר",
    category: "village",
    lat: 48.0794,
    lng: 7.3558,
    description:
      "Capital of Alsatian wine, known as 'Little Venice' for its canals in the Petite Venise quarter. Half-timbered colorful houses, the Unterlinden Museum with the famous Isenheim Altarpiece, and a vibrant covered market.",
    description_he:
      'בירת יין אלזס, מכונה "ונציה הקטנה" בזכות התעלות ברובע Petite Venise. בתי עץ צבעוניים, מוזיאון Unterlinden עם מזבח Isenheim המפורסם, ושוק מקורה תוסס.',
    rating: 5.0,
    visit_duration_min: 240,
    address: "Colmar, Haut-Rhin, Alsace",
    website: "https://www.tourisme-colmar.com",
    tags: ["must-see", "city", "petite-venise", "museum", "market"],
    must_see: true,
  },
  {
    name: "Eguisheim",
    name_he: "אגישהיים",
    category: "village",
    lat: 48.0428,
    lng: 7.3069,
    description:
      "Voted France's Favorite Village in 2013. A perfectly circular medieval village with concentric streets spiraling around a central castle square. Famous for its flowered balconies and Grands Crus wines.",
    description_he:
      'נבחר ל"הכפר האהוב בצרפת" ב-2013. כפר מימי הביניים בצורת חילזון מושלם עם רחובות קונצנטריים סביב כיכר הטירה. מפורסם במרפסות הפרחוניות ויינות Grands Crus.',
    rating: 5.0,
    visit_duration_min: 120,
    address: "Eguisheim, Haut-Rhin, Alsace",
    website: "https://www.tourisme-eguisheim-rouffach.com",
    tags: ["must-see", "circular-village", "flowered", "grands-crus"],
    must_see: true,
  },
  {
    name: "Riquewihr",
    name_he: "ריקוויר",
    category: "village",
    lat: 48.1667,
    lng: 7.2980,
    description:
      "Called 'The Pearl of the Vineyard', this perfectly preserved medieval village hasn't changed since the 16th century. Walk through the Dolder Gate, explore cobblestone streets lined with wine shops and half-timbered houses.",
    description_he:
      'מכונה "פנינת הכרם", כפר מימי הביניים משומר להפליא שלא השתנה מאז המאה ה-16. עברו בשער דולדר, חקרו רחובות מרוצפים מלאי חנויות יין ובתי עץ.',
    rating: 5.0,
    visit_duration_min: 150,
    address: "Riquewihr, Haut-Rhin, Alsace",
    website: "https://www.riquewihr.fr",
    tags: ["must-see", "medieval", "dolder-gate", "wine-shops"],
    must_see: true,
  },
  {
    name: "Kaysersberg",
    name_he: "קייזרסברג",
    category: "village",
    lat: 48.1386,
    lng: 7.2639,
    description:
      "Voted France's Favorite Village in 2017. Birthplace of Albert Schweitzer. Features a ruined castle with panoramic views, a fortified bridge from the 15th century, and excellent wineries.",
    description_he:
      'נבחר ל"הכפר האהוב בצרפת" ב-2017. מקום הולדתו של אלברט שוויצר. טירה הרוסה עם נוף פנורמי, גשר מבוצר מהמאה ה-15 ויקבים מצוינים.',
    rating: 5.0,
    visit_duration_min: 150,
    address: "Kaysersberg Vignoble, Haut-Rhin, Alsace",
    website: "https://www.kaysersberg.com",
    tags: ["must-see", "castle", "fortified-bridge", "schweitzer"],
    must_see: true,
  },
  {
    name: "Ribeauvillé",
    name_he: "ריבוויה",
    category: "village",
    lat: 48.1947,
    lng: 7.3186,
    description:
      "A picturesque town overlooked by three castles: Saint-Ulrich, Girsberg, and Haut-Ribeaupierre. Known for the Pfifferdaj (fife players) festival, the oldest in Alsace. Great base for vineyard hikes.",
    description_he:
      'עיירה ציורית עם 3 טירות: סן-אולריך, גירסברג והו-ריבופייר. ידועה בפסטיבל Pfifferdaj (נגני החליל), העתיק באלזס. בסיס מצוין לטיולים בכרמים.',
    rating: 4.5,
    visit_duration_min: 120,
    address: "Ribeauvillé, Haut-Rhin, Alsace",
    website: "https://www.ribeauville-riquewihr.com",
    tags: ["three-castles", "pfifferdaj", "vineyard-hikes"],
    must_see: true,
  },
  {
    name: "Turckheim",
    name_he: "טורקהיים",
    category: "village",
    lat: 48.0847,
    lng: 7.2800,
    description:
      "Famous for its night watchman who still walks the streets at 10 PM from May to October. Enter through the impressive Porte de France. Home to Grand Cru Brand vineyard.",
    description_he:
      "מפורסם בשומר הלילה שעדיין מסייר ברחובות בשעה 22:00 ממאי עד אוקטובר. הכניסה דרך שער צרפת המרשים. בית הכרם Grand Cru Brand.",
    rating: 4.0,
    visit_duration_min: 75,
    address: "Turckheim, Haut-Rhin, Alsace",
    tags: ["night-watchman", "porte-de-france", "grand-cru-brand"],
    must_see: false,
  },
  {
    name: "Obernai",
    name_he: "אוברנה",
    category: "village",
    lat: 48.4622,
    lng: 7.4828,
    description:
      "A lively town at the northern end of the Wine Route. Beautiful market square (Place du Marché), the Kapellturm belfry, and Sainte Odile monastery nearby on the hilltop.",
    description_he:
      "עיירה תוססת בקצה הצפוני של דרך היין. כיכר שוק יפהפייה (Place du Marché), מגדל הפעמונים Kapellturm ומנזר סנט אודיל על ההר הסמוך.",
    rating: 4.0,
    visit_duration_min: 120,
    address: "Obernai, Bas-Rhin, Alsace",
    website: "https://www.tourisme-obernai.fr",
    tags: ["market-square", "kapellturm", "sainte-odile"],
    must_see: false,
  },
  {
    name: "Bergheim",
    name_he: "ברגהיים",
    category: "village",
    lat: 48.2069,
    lng: 7.3614,
    description:
      "One of the few Alsatian villages with complete medieval walls. Home to Grands Crus Altenberg de Bergheim and Kanzlerberg. Quiet and authentic, less touristy than its famous neighbors.",
    description_he:
      "מהכפרים הבודדים באלזס עם חומות מימי הביניים שלמות. בית הכרמים Grands Crus Altenberg de Bergheim ו-Kanzlerberg. שקט ואותנטי, פחות תיירותי מהשכנים.",
    rating: 3.5,
    visit_duration_min: 60,
    address: "Bergheim, Haut-Rhin, Alsace",
    tags: ["medieval-walls", "grands-crus", "quiet"],
    must_see: false,
  },
  {
    name: "Hunawihr",
    name_he: "הונוויר",
    category: "village",
    lat: 48.1800,
    lng: 7.3100,
    description:
      "A tiny village surrounded by vineyards, famous for its 15th-century fortified church perched among the vines. Home to the Stork Reintroduction Centre and a butterfly garden.",
    description_he:
      "כפר זעיר מוקף כרמים, מפורסם בכנסייה המבוצרת מהמאה ה-15 ניצבת בין הגפנים. בית מרכז שחזור החסידות וגן פרפרים.",
    rating: 4.0,
    visit_duration_min: 45,
    address: "Hunawihr, Haut-Rhin, Alsace",
    tags: ["fortified-church", "stork-centre", "vineyards"],
    must_see: false,
  },
  {
    name: "Mittelbergheim",
    name_he: "מיטלברגהיים",
    category: "village",
    lat: 48.3961,
    lng: 7.4414,
    description:
      "A quiet Renaissance village classified among France's Most Beautiful Villages. Known for Grand Cru Zotzenberg and its exceptional Sylvaner wines. Authentic atmosphere without crowds.",
    description_he:
      'כפר רנסנס שקט המסווג בין "הכפרים היפים בצרפת". מפורסם ב-Grand Cru Zotzenberg ויינות Sylvaner יוצאי דופן. אווירה אותנטית ללא המונים.',
    rating: 3.5,
    visit_duration_min: 45,
    address: "Mittelbergheim, Bas-Rhin, Alsace",
    tags: ["renaissance", "grand-cru-zotzenberg", "sylvaner", "quiet"],
    must_see: false,
  },
  {
    name: "Andlau",
    name_he: "אנדלאו",
    category: "village",
    lat: 48.3867,
    lng: 7.4172,
    description:
      "Known for its Romanesque abbey church with remarkable stone carvings and Grand Cru Kastelberg. The ruins of Château d'Andlau overlook the village. A gateway to beautiful vineyard trails.",
    description_he:
      "ידוע במנזר הרומנסקי עם גילופי אבן מרשימים ו-Grand Cru Kastelberg. חורבות טירת אנדלאו צופות על הכפר. שער לשבילי כרמים יפהפיים.",
    rating: 3.5,
    visit_duration_min: 60,
    address: "Andlau, Bas-Rhin, Alsace",
    tags: ["abbey", "romanesque", "grand-cru-kastelberg", "chateau"],
    must_see: false,
  },
  {
    name: "Dambach-la-Ville",
    name_he: "דמבך-לה-ויל",
    category: "village",
    lat: 48.3239,
    lng: 7.4253,
    description:
      "The largest wine-producing commune on the Alsace Wine Route. Enter through one of three medieval gates. Home to Grand Cru Frankstein and the picturesque Saint-Sébastien chapel among the vines.",
    description_he:
      "הקומונה המייצרת יין הגדולה ביותר בדרך היין. כניסה דרך אחד משלושה שערים מימי הביניים. בית Grand Cru Frankstein וכנסיית סן-סבסטיאן הציורית בין הכרמים.",
    rating: 3.5,
    visit_duration_min: 60,
    address: "Dambach-la-Ville, Bas-Rhin, Alsace",
    tags: ["wine-producing", "medieval-gates", "frankstein"],
    must_see: false,
  },

  // === WINERIES ===
  {
    name: "Domaine Weinbach",
    name_he: "דומיין וויינבך",
    category: "winery",
    subcategory: "grand_cru",
    lat: 48.1350,
    lng: 7.2600,
    description:
      "One of the most prestigious domaines in Alsace, run by the Faller family. Located in a former Capuchin monastery at the foot of Grand Cru Schlossberg. Known for exceptional Riesling and Gewürztraminer.",
    description_he:
      "אחד היקבים היוקרתיים ביותר באלזס, מנוהל ע\"י משפחת פאלר. ממוקם במנזר קפוצ'ינים לשעבר למרגלות Grand Cru Schlossberg. מפורסם בריזלינג וגוורצטרמינר יוצאי דופן.",
    rating: 5.0,
    visit_duration_min: 60,
    address: "25 Route du Vin, 68240 Kaysersberg Vignoble",
    website: "https://www.domaineweinbach.com",
    price_range: "€€€",
    wine_varieties: ["Riesling", "Gewürztraminer", "Pinot Gris", "Muscat"],
    tags: ["grand-cru", "family-run", "historic", "premium"],
    must_see: true,
  },
  {
    name: "Domaine Zind-Humbrecht",
    name_he: "דומיין זינד-הומברכט",
    category: "winery",
    subcategory: "grand_cru",
    lat: 48.0736,
    lng: 7.2800,
    description:
      "World-renowned biodynamic producer. Olivier Humbrecht MW (Master of Wine) crafts some of Alsace's most intense and terroir-driven wines. Four Grands Crus including Brand and Rangen.",
    description_he:
      "יצרן ביודינמי בעל שם עולמי. אוליבייה הומברכט MW מייצר מהיינות האינטנסיביים ביותר באלזס. ארבעה Grands Crus כולל Brand ו-Rangen.",
    rating: 5.0,
    visit_duration_min: 75,
    address: "4 Route de Colmar, 68230 Turckheim",
    website: "https://www.zindhumbrecht.fr",
    price_range: "€€€",
    wine_varieties: ["Riesling", "Gewürztraminer", "Pinot Gris", "Pinot Blanc"],
    tags: ["biodynamic", "master-of-wine", "grand-cru", "world-class"],
    must_see: true,
  },
  {
    name: "Maison Trimbach",
    name_he: "מזון טרימבך",
    category: "winery",
    subcategory: "grand_cru",
    lat: 48.1950,
    lng: 7.3200,
    description:
      "Family estate since 1626, famous for the legendary Riesling Clos Sainte Hune — considered one of the world's greatest white wines. Classic, mineral-driven style.",
    description_he:
      "יקב משפחתי מ-1626, מפורסם בריזלינג Clos Sainte Hune האגדי — נחשב מהיינות הלבנים הגדולים בעולם. סגנון קלאסי ומינרלי.",
    rating: 5.0,
    visit_duration_min: 60,
    address: "15 Route de Bergheim, 68150 Ribeauvillé",
    website: "https://www.trimbach.fr",
    price_range: "€€€",
    wine_varieties: ["Riesling", "Gewürztraminer", "Pinot Gris"],
    tags: ["clos-sainte-hune", "historic", "classic", "mineral"],
    must_see: true,
  },
  {
    name: "Hugel & Fils",
    name_he: "הוגל ובניו",
    category: "winery",
    subcategory: "grand_cru",
    lat: 48.1667,
    lng: 7.2980,
    description:
      "One of Alsace's most historic houses, operating since 1639 in Riquewihr. Pioneer of late-harvest (Vendanges Tardives) classification. The Hugel family cellar houses casks from the 17th century.",
    description_he:
      "מבתי היין ההיסטוריים ביותר באלזס, פועל מ-1639 בריקוויר. חלוץ סיווג הבציר המאוחר (Vendanges Tardives). מרתף המשפחה מכיל חביות מהמאה ה-17.",
    rating: 4.5,
    visit_duration_min: 60,
    address: "2 Rue de la 1ère Armée, 68340 Riquewihr",
    website: "https://www.hugel.com",
    price_range: "€€€",
    wine_varieties: ["Riesling", "Gewürztraminer", "Pinot Gris", "Pinot Blanc"],
    tags: ["historic", "vendanges-tardives", "1639", "premium"],
    must_see: true,
  },
  {
    name: "Marcel Deiss",
    name_he: "מרסל דייס",
    category: "winery",
    subcategory: "grand_cru",
    lat: 48.2069,
    lng: 7.3614,
    description:
      "Revolutionary producer known for 'complantation' — planting multiple grape varieties together in the same vineyard. Jean-Michel Deiss creates unique field blends that express terroir above variety.",
    description_he:
      "יצרן מהפכני המפורסם ב-complantation — שתילת זנים מרובים יחד באותו כרם. ז'אן-מישל דייס יוצר תערובות שדה ייחודיות שמבטאות טרואר מעל זן.",
    rating: 4.5,
    visit_duration_min: 60,
    address: "15 Route du Vin, 68750 Bergheim",
    website: "https://www.marceldeiss.com",
    price_range: "€€€",
    wine_varieties: ["Field Blend", "Riesling", "Gewürztraminer", "Pinot Gris"],
    tags: ["innovative", "complantation", "field-blend", "terroir"],
    must_see: false,
  },
  {
    name: "Albert Mann",
    name_he: "אלברט מאן",
    category: "winery",
    subcategory: "grand_cru",
    lat: 48.0531,
    lng: 7.3000,
    description:
      "Biodynamic estate in Wettolsheim with two Grands Crus: Furstentum and Hengst. The Barthelmé brothers produce powerful, concentrated wines with great aging potential.",
    description_he:
      "יקב ביודינמי בווטולסהיים עם שני Grands Crus: פירשטנטום והנגסט. האחים ברתלמה מייצרים יינות עוצמתיים ומרוכזים עם פוטנציאל יישון גבוה.",
    rating: 4.5,
    visit_duration_min: 60,
    address: "13 Rue du Château, 68920 Wettolsheim",
    website: "https://www.albertmann.com",
    price_range: "€€",
    wine_varieties: ["Riesling", "Gewürztraminer", "Pinot Gris", "Pinot Noir"],
    tags: ["biodynamic", "grands-crus", "powerful", "concentrated"],
    must_see: false,
  },
  {
    name: "Domaine Bott-Geyl",
    name_he: "דומיין בוט-גייל",
    category: "winery",
    subcategory: "grand_cru",
    lat: 48.1578,
    lng: 7.3247,
    description:
      "Biodynamic estate in Beblenheim producing expressive wines from Grands Crus Sonnenglanz and Mandelberg. Jean-Christophe Bott emphasizes purity and natural winemaking.",
    description_he:
      "יקב ביודינמי בבבלנהיים המייצר יינות אקספרסיביים מ-Grands Crus Sonnenglanz ו-Mandelberg. ז'אן-כריסטוף בוט מדגיש טוהר ויינות טבעיים.",
    rating: 4.0,
    visit_duration_min: 60,
    address: "1 Rue du Petit Château, 68980 Beblenheim",
    website: "https://www.bott-geyl.com",
    price_range: "€€",
    wine_varieties: ["Gewürztraminer", "Riesling", "Muscat", "Pinot Gris"],
    tags: ["biodynamic", "natural", "grands-crus", "expressive"],
    must_see: false,
  },
  {
    name: "Maison Louis Sipp",
    name_he: "מזון לואי סיפ",
    category: "winery",
    subcategory: "grand_cru",
    lat: 48.1942,
    lng: 7.3195,
    description:
      "Elegant producer in Ribeauvillé with Grand Cru Kirchberg and Osterberg. Known for precise, mineral Rieslings and the excellent Crémant d'Alsace.",
    description_he:
      "יצרן אלגנטי בריבוויה עם Grand Cru Kirchberg ו-Osterberg. מפורסם בריזלינג מדויק ומינרלי וב-Crémant d'Alsace מצוין.",
    rating: 4.0,
    visit_duration_min: 45,
    address: "5 Grand Rue, 68150 Ribeauvillé",
    website: "https://www.sipp.com",
    price_range: "€€",
    wine_varieties: ["Riesling", "Pinot Gris", "Crémant d'Alsace"],
    tags: ["elegant", "mineral", "cremant", "grands-crus"],
    must_see: false,
  },
  {
    name: "Cave de Turckheim",
    name_he: "מערת טורקהיים",
    category: "winery",
    lat: 48.0870,
    lng: 7.2820,
    description:
      "One of Alsace's best cooperatives. Excellent value wines including Grand Cru Brand. Spacious tasting room with friendly staff and good introduction to Alsatian wines.",
    description_he:
      "מהקואופרטיבים הטובים באלזס. יינות בערך מצוין כולל Grand Cru Brand. חדר טעימות מרווח עם צוות ידידותי והיכרות טובה עם יינות אלזס.",
    rating: 4.0,
    visit_duration_min: 45,
    address: "16 Rue des Tuileries, 68230 Turckheim",
    website: "https://www.cave-turckheim.com",
    price_range: "€",
    wine_varieties: ["Riesling", "Gewürztraminer", "Pinot Gris", "Pinot Noir"],
    tags: ["cooperative", "value", "tasting-room", "grand-cru-brand"],
    must_see: false,
  },
  {
    name: "Domaine Paul Blanck",
    name_he: "דומיין פול בלאנק",
    category: "winery",
    subcategory: "grand_cru",
    lat: 48.1250,
    lng: 7.2800,
    description:
      "Family estate in Kientzheim with Grands Crus Furstentum and Schlossberg. Known for elegant, age-worthy wines. The charming tasting cellar is worth a visit.",
    description_he:
      "יקב משפחתי בקיינצהיים עם Grands Crus Furstentum ו-Schlossberg. מפורסם ביינות אלגנטיים שמתאימים ליישון. מרתף הטעימות המקסים שווה ביקור.",
    rating: 4.5,
    visit_duration_min: 60,
    address: "32 Grand Rue, 68240 Kientzheim",
    website: "https://www.blanck.com",
    price_range: "€€",
    wine_varieties: ["Riesling", "Gewürztraminer", "Pinot Gris", "Pinot Blanc"],
    tags: ["family", "grands-crus", "elegant", "age-worthy"],
    must_see: false,
  },

  // === RESTAURANTS ===
  {
    name: "Winstub du Chambard",
    name_he: "וינשטוב דו שאמבר",
    category: "restaurant",
    subcategory: "winstub",
    lat: 48.1386,
    lng: 7.2639,
    description:
      "Cozy Winstub in Hotel Chambard in Kaysersberg. Traditional Alsatian dishes with a modern twist. Excellent Tarte Flambée and local wines by the glass. Warm, rustic atmosphere.",
    description_he:
      "וינשטוב נעימה במלון שאמבר בקייזרסברג. מאכלים אלזסיים מסורתיים עם טוויסט מודרני. טארט פלמבה מצוינת ויינות מקומיים בכוס. אווירה חמה וכפרית.",
    rating: 4.5,
    visit_duration_min: 90,
    address: "13 Rue du Général de Gaulle, 68240 Kaysersberg",
    website: "https://www.lechambard.fr",
    price_range: "€€",
    food_specialties: ["Tarte Flambée", "Choucroute", "Baeckeoffe"],
    tags: ["winstub", "traditional", "kaysersberg", "cozy"],
    must_see: false,
  },
  {
    name: "JY'S",
    name_he: "ג'יי וואי'ס",
    category: "restaurant",
    subcategory: "michelin",
    lat: 48.0780,
    lng: 7.3558,
    description:
      "Two Michelin-starred restaurant by Jean-Yves Schillinger in Colmar. Creative French-Asian fusion cuisine. Elegant riverside setting along the Lauch river. Reservation essential.",
    description_he:
      "מסעדת שני כוכבי מישלן של ז'אן-איב שילינגר בקולמר. מטבח צרפתי-אסיאתי יצירתי. מיקום אלגנטי לצד נהר הלאוך. הזמנת מקום חובה.",
    rating: 5.0,
    visit_duration_min: 120,
    address: "17 Rue de la Poissonnerie, 68000 Colmar",
    website: "https://www.jean-yves-schillinger.com",
    price_range: "€€€",
    food_specialties: ["French-Asian Fusion", "Tasting Menu", "Fine Dining"],
    tags: ["michelin", "fine-dining", "fusion", "colmar"],
    must_see: false,
  },
  {
    name: "La Table du Gourmet",
    name_he: "לה טאבל דו גורמה",
    category: "restaurant",
    subcategory: "michelin",
    lat: 48.1667,
    lng: 7.2980,
    description:
      "One Michelin star restaurant in Riquewihr with stunning vineyard views. Chef creates refined Alsatian cuisine using seasonal local ingredients. Wine list focuses on natural producers.",
    description_he:
      "מסעדת כוכב מישלן בריקוויר עם נוף כרמים מדהים. השף יוצר מטבח אלזסי מעודן מחומרי גלם עונתיים מקומיים. רשימת יינות מתמקדת ביצרנים טבעיים.",
    rating: 4.5,
    visit_duration_min: 120,
    address: "5 Rue de la 1ère Armée, 68340 Riquewihr",
    price_range: "€€€",
    food_specialties: ["Modern Alsatian", "Tasting Menu", "Natural Wine"],
    tags: ["michelin", "vineyard-view", "seasonal", "natural-wine"],
    must_see: false,
  },
  {
    name: "Winstub S'Muensterstuewel",
    name_he: "וינשטוב סמינסטרשטיוול",
    category: "restaurant",
    subcategory: "winstub",
    lat: 48.0786,
    lng: 7.3556,
    description:
      "Authentic Winstub in the heart of Colmar. Traditional atmosphere with checked tablecloths, wooden beams, and hearty Alsatian fare. Try the Choucroute Garnie or Baeckeoffe.",
    description_he:
      "וינשטוב אותנטית בלב קולמר. אווירה מסורתית עם מפות משובצות, קורות עץ ואוכל אלזסי שופע. נסו את שוקרוט גארני או בקאוף.",
    rating: 4.0,
    visit_duration_min: 90,
    address: "12 Place de la Cathédrale, 68000 Colmar",
    price_range: "€€",
    food_specialties: ["Choucroute Garnie", "Baeckeoffe", "Tarte Flambée"],
    tags: ["winstub", "traditional", "colmar", "authentic"],
    must_see: false,
  },
  {
    name: "Au Trotthus",
    name_he: "או טרוטהוס",
    category: "restaurant",
    subcategory: "winstub",
    lat: 48.1672,
    lng: 7.2975,
    description:
      "Charming Winstub in a half-timbered house in Riquewihr. Known for generous portions of traditional dishes. Excellent wine list featuring local producers. Cozy terrace in summer.",
    description_he:
      "וינשטוב מקסימה בבית עץ בריקוויר. ידועה במנות נדיבות של אוכל מסורתי. רשימת יינות מצוינת עם יצרנים מקומיים. מרפסת נעימה בקיץ.",
    rating: 4.0,
    visit_duration_min: 90,
    address: "29 Rue du Général de Gaulle, 68340 Riquewihr",
    price_range: "€€",
    food_specialties: ["Tarte Flambée", "Munster", "Kougelhopf"],
    tags: ["winstub", "riquewihr", "generous-portions", "terrace"],
    must_see: false,
  },
  {
    name: "Caveau Heuhaus",
    name_he: "קאבו הויהאוס",
    category: "restaurant",
    subcategory: "winstub",
    lat: 48.0430,
    lng: 7.3071,
    description:
      "Popular Winstub in Eguisheim with a beautiful courtyard. Famous for their Flammekueche (Tarte Flambée) in numerous varieties. Great local wines at fair prices.",
    description_he:
      'וינשטוב פופולרית באגישהיים עם חצר יפהפייה. מפורסמת בפלמקוכ (טארט פלמבה) במגוון סוגים. יינות מקומיים מצוינים במחירים הוגנים.',
    rating: 4.0,
    visit_duration_min: 75,
    address: "6 Place du Château Saint-Léon, 68420 Eguisheim",
    price_range: "€",
    food_specialties: ["Tarte Flambée", "Presskopf", "Alsatian Salad"],
    tags: ["winstub", "eguisheim", "flammekueche", "courtyard"],
    must_see: false,
  },
  {
    name: "L'Auberge du Schoenenbourg",
    name_he: "אוברז' דו שנאנבורג",
    category: "restaurant",
    subcategory: "winstub",
    lat: 48.1670,
    lng: 7.2990,
    description:
      "Traditional restaurant overlooking the Schoenenbourg Grand Cru vineyard in Riquewihr. Refined Alsatian cuisine with spectacular views. Famous for foie gras and seasonal game dishes.",
    description_he:
      "מסעדה מסורתית עם נוף על כרם Grand Cru Schoenenbourg בריקוויר. מטבח אלזסי מעודן עם נופים מרהיבים. מפורסמת בפואה גרא ומנות ציד עונתיות.",
    rating: 4.5,
    visit_duration_min: 90,
    address: "2 Rue de la Piscine, 68340 Riquewihr",
    price_range: "€€€",
    food_specialties: ["Foie Gras", "Game", "Tarte Flambée"],
    tags: ["vineyard-view", "refined", "foie-gras", "seasonal"],
    must_see: false,
  },
  {
    name: "La Soï",
    name_he: "לה סואה",
    category: "restaurant",
    lat: 48.0800,
    lng: 7.3545,
    description:
      "Modern bistro in Colmar combining Alsatian traditions with world flavors. Great lunch menu, relaxed atmosphere, and excellent natural wine selection.",
    description_he:
      "ביסטרו מודרני בקולמר המשלב מסורות אלזסיות עם טעמי עולם. תפריט צהריים מצוין, אווירה נינוחה ומבחר יינות טבעיים מצוין.",
    rating: 4.0,
    visit_duration_min: 75,
    address: "6 Rue Schongauer, 68000 Colmar",
    price_range: "€€",
    food_specialties: ["Modern Alsatian", "Natural Wine", "Lunch Menu"],
    tags: ["bistro", "modern", "natural-wine", "colmar"],
    must_see: false,
  },

  // === VIEWPOINTS / LANDMARKS ===
  {
    name: "Château du Haut-Kœnigsbourg",
    name_he: "טירת הו-קניגסבורג",
    category: "viewpoint",
    subcategory: "castle",
    lat: 48.2494,
    lng: 7.3444,
    description:
      "Imposing medieval castle at 757m altitude with panoramic views of the Rhine plain, the Vosges mountains, and the Black Forest. Fully restored by Kaiser Wilhelm II in 1901-1908.",
    description_he:
      "טירה מימי הביניים מרשימה בגובה 757 מטר עם נוף פנורמי על מישור הריין, הרי הווז' והיער השחור. שוחזרה במלואה ע\"י הקייזר וילהלם ה-2 ב-1901-1908.",
    rating: 5.0,
    visit_duration_min: 120,
    address: "Château du Haut-Kœnigsbourg, 67600 Orschwiller",
    website: "https://www.haut-koenigsbourg.fr",
    price_range: "€",
    tags: ["castle", "panorama", "must-see", "medieval", "restored"],
    must_see: true,
  },
  {
    name: "Mont Sainte-Odile",
    name_he: "הר סנט אודיל",
    category: "viewpoint",
    subcategory: "monastery",
    lat: 48.4378,
    lng: 7.4031,
    description:
      "Sacred mountain of Alsace at 764m with a monastery founded in the 7th century. Breathtaking views of the Rhine plain. The Pagan Wall (Mur Païen) is a mysterious 10km megalithic enclosure.",
    description_he:
      "ההר הקדוש של אלזס בגובה 764 מטר עם מנזר שנוסד במאה ה-7. נוף עוצר נשימה על מישור הריין. החומה הפגאנית (Mur Païen) היא מתחם מגליתי מסתורי באורך 10 ק\"מ.",
    rating: 4.5,
    visit_duration_min: 120,
    address: "Mont Sainte-Odile, 67530 Ottrott",
    website: "https://www.mont-sainte-odile.com",
    price_range: "€",
    tags: ["monastery", "panorama", "pagan-wall", "pilgrimage"],
    must_see: true,
  },
  {
    name: "Château de Kaysersberg",
    name_he: "טירת קייזרסברג",
    category: "viewpoint",
    subcategory: "castle",
    lat: 48.1403,
    lng: 7.2597,
    description:
      "Ruined 13th-century castle above Kaysersberg with a massive circular donjon. Short steep climb rewards with beautiful views over the village, vineyards, and the Weiss valley.",
    description_he:
      'חורבות טירה מהמאה ה-13 מעל קייזרסברג עם מגדל עגול מסיבי. טיפוס קצר ותלול מתגמל בנוף יפהפה על הכפר, הכרמים ועמק ה-Weiss.',
    rating: 4.0,
    visit_duration_min: 45,
    address: "Château, 68240 Kaysersberg",
    tags: ["castle", "ruins", "viewpoint", "free-entry", "hike"],
    must_see: false,
  },
  {
    name: "Les Trois Châteaux de Ribeauvillé",
    name_he: "שלוש הטירות של ריבוויה",
    category: "viewpoint",
    subcategory: "castle",
    lat: 48.1950,
    lng: 7.3000,
    description:
      "Three castle ruins above Ribeauvillé: Saint-Ulrich (the largest), Girsberg (the smallest, on a rocky pinnacle), and Haut-Ribeaupierre (the highest). A 2-3 hour hiking trail connects all three.",
    description_he:
      "שלוש טירות חרבות מעל ריבוויה: סן-אולריך (הגדולה), גירסברג (הקטנה, על צוק סלעי) והו-ריבופייר (הגבוהה). שביל טיול של 2-3 שעות מחבר את השלוש.",
    rating: 4.0,
    visit_duration_min: 150,
    address: "Sentier des châteaux, 68150 Ribeauvillé",
    tags: ["castle", "hiking", "ruins", "panorama", "three-castles"],
    must_see: false,
  },
  {
    name: "Route des Cinq Châteaux",
    name_he: "דרך חמשת הטירות",
    category: "viewpoint",
    subcategory: "hiking",
    lat: 48.2300,
    lng: 7.3550,
    description:
      "Scenic hiking trail connecting five castles between Ribeauvillé and Thannenkirch. Passes through forests and offers spectacular views of the Alsatian plain and vineyards below.",
    description_he:
      "שביל הליכה ציורי המחבר חמש טירות בין ריבוויה לטאנקירך. עובר דרך יערות ומציע נוף מרהיב על המישור האלזסי והכרמים למטה.",
    rating: 4.0,
    visit_duration_min: 240,
    address: "Sentier des cinq châteaux, Ribeauvillé - Thannenkirch",
    tags: ["hiking", "castles", "panorama", "nature", "forest"],
    must_see: false,
  },
  {
    name: "Église fortifiée de Hunawihr",
    name_he: "הכנסייה המבוצרת של הונוויר",
    category: "viewpoint",
    subcategory: "church",
    lat: 48.1806,
    lng: 7.3083,
    description:
      "Iconic 15th-century fortified church surrounded by vineyards, one of the most photographed sites in Alsace. The church served as both a place of worship and a fortress for villagers.",
    description_he:
      "כנסייה מבוצרת איקונית מהמאה ה-15 מוקפת כרמים, מהאתרים המצולמים ביותר באלזס. הכנסייה שימשה הן כמקום תפילה והן כמבצר לתושבי הכפר.",
    rating: 4.5,
    visit_duration_min: 30,
    address: "Hunawihr, 68150",
    tags: ["church", "fortified", "iconic", "vineyards", "photography"],
    must_see: true,
  },

  // === ADDITIONAL POIs ===
  {
    name: "Marché Couvert de Colmar",
    name_he: "השוק המקורה של קולמר",
    category: "restaurant",
    subcategory: "market",
    lat: 48.0781,
    lng: 7.3563,
    description:
      "Colmar's covered market hall with local cheese, charcuterie, bread, pastries, and regional products. Perfect for picking up picnic supplies or a quick lunch at one of the food stalls.",
    description_he:
      "שוק מקורה של קולמר עם גבינות מקומיות, בשרים מעובדים, לחם, מאפים ומוצרים אזוריים. מושלם לציוד לפיקניק או ארוחת צהריים מהירה בדוכנים.",
    rating: 4.0,
    visit_duration_min: 45,
    address: "13 Rue des Écoles, 68000 Colmar",
    price_range: "€",
    food_specialties: ["Local Cheese", "Charcuterie", "Kougelhopf", "Pretzels"],
    tags: ["market", "local-products", "picnic", "lunch"],
    must_see: false,
  },
  {
    name: "Petite Venise",
    name_he: "ונציה הקטנה",
    category: "viewpoint",
    subcategory: "quarter",
    lat: 48.0770,
    lng: 7.3570,
    description:
      "The most picturesque quarter of Colmar, where the Lauch river runs between half-timbered houses. Take a flat-bottom boat ride or walk along the Quai de la Poissonnerie for the best views.",
    description_he:
      "הרובע הציורי ביותר בקולמר, שם נהר הלאוך זורם בין בתי עץ. שייטו בסירה שטוחה או טיילו לאורך רחוב Quai de la Poissonnerie לנוף הטוב ביותר.",
    rating: 5.0,
    visit_duration_min: 60,
    address: "Quai de la Poissonnerie, 68000 Colmar",
    tags: ["iconic", "boat-ride", "canal", "photography", "must-see"],
    must_see: true,
  },
  {
    name: "Musée Unterlinden",
    name_he: "מוזיאון אונטרלינדן",
    category: "viewpoint",
    subcategory: "museum",
    lat: 48.0800,
    lng: 7.3550,
    description:
      "Major art museum in a 13th-century Dominican convent. Houses the masterpiece Isenheim Altarpiece by Matthias Grünewald. Extended in 2015 by Herzog & de Meuron architects.",
    description_he:
      "מוזיאון אמנות מרכזי במנזר דומיניקני מהמאה ה-13. מאכלס את מזבח Isenheim של מתיאס גרינוולד. הורחב ב-2015 ע\"י אדריכלי הרצוג ודה מרון.",
    rating: 4.5,
    visit_duration_min: 90,
    address: "Place Unterlinden, 68000 Colmar",
    website: "https://www.musee-unterlinden.com",
    price_range: "€",
    tags: ["museum", "art", "isenheim", "medieval", "architecture"],
    must_see: true,
  },
  {
    name: "Sentier Viticole des Grands Crus",
    name_he: "שביל היין של גראנד קרו",
    category: "viewpoint",
    subcategory: "hiking",
    lat: 48.1500,
    lng: 7.3100,
    description:
      "Walking trail through the Grand Cru vineyards between Ribeauvillé and Riquewihr. Informative panels explain terroir, grape varieties, and winemaking. Best at sunset with golden light on the vines.",
    description_he:
      "שביל הליכה דרך כרמי Grand Cru בין ריבוויה לריקוויר. לוחות מידע מסבירים טרואר, זני ענבים ותהליך ייצור יין. הכי יפה בשקיעה עם אור זהוב על הגפנים.",
    rating: 4.5,
    visit_duration_min: 120,
    address: "Sentier Viticole, Ribeauvillé - Riquewihr",
    tags: ["hiking", "vineyards", "grands-crus", "sunset", "educational"],
    must_see: false,
  },

  // Additional villages / POIs to reach ~50
  {
    name: "Niedermorschwihr",
    name_he: "נידרמורשוויר",
    category: "village",
    lat: 48.1036,
    lng: 7.2833,
    description:
      "Tiny village known for its twisted church spire and Grand Cru Sommerberg vineyard. A hidden gem away from the crowds with some excellent small producers.",
    description_he:
      "כפר זעיר ידוע בצריח הכנסייה המפותל וכרם Grand Cru Sommerberg. פנינה נסתרת הרחק מההמונים עם כמה יצרנים קטנים מצוינים.",
    rating: 3.5,
    visit_duration_min: 30,
    address: "Niedermorschwihr, Haut-Rhin",
    tags: ["twisted-spire", "grand-cru", "quiet", "hidden-gem"],
    must_see: false,
  },
  {
    name: "Ammerschwihr",
    name_he: "אמרשוויר",
    category: "village",
    lat: 48.1247,
    lng: 7.2831,
    description:
      "Largely rebuilt after WWII destruction, known for Grand Cru Kaefferkopf — the only Grand Cru that permits blending. Several good wineries and a lovely Porte Haute gate.",
    description_he:
      "נבנה מחדש ברובו אחרי הרס מלחמת העולם השנייה, ידוע ב-Grand Cru Kaefferkopf — Grand Cru היחיד שמאפשר תערובת. כמה יקבים טובים ושער עליון מקסים.",
    rating: 3.0,
    visit_duration_min: 45,
    address: "Ammerschwihr, Haut-Rhin",
    tags: ["kaefferkopf", "rebuilt", "grand-cru", "gate"],
    must_see: false,
  },
  {
    name: "Kientzheim",
    name_he: "קיינצהיים",
    category: "village",
    lat: 48.1344,
    lng: 7.2847,
    description:
      "Charming fortified village next to Kaysersberg with the Musée du Vignoble et des Vins d'Alsace (Wine Museum) inside the Château de la Confrérie Saint-Étienne.",
    description_he:
      "כפר מבוצר מקסים ליד קייזרסברג עם מוזיאון הכרם ויינות אלזס בתוך טירת Confrérie Saint-Étienne.",
    rating: 3.5,
    visit_duration_min: 60,
    address: "Kientzheim, 68240 Kaysersberg Vignoble",
    tags: ["wine-museum", "fortified", "chateau"],
    must_see: false,
  },
  {
    name: "Winstub Brenner",
    name_he: "וינשטוב ברנר",
    category: "restaurant",
    subcategory: "winstub",
    lat: 48.0781,
    lng: 7.3575,
    description:
      "Classic Colmar Winstub frequented by locals. No-frills authentic Alsatian cooking with generous portions. Known for excellent Tarte Flambée and friendly service.",
    description_he:
      "וינשטוב קלאסית בקולמר שמקומיים אוהבים. בישול אלזסי אותנטי ללא עודפים עם מנות נדיבות. ידועה בטארט פלמבה מצוינת ושירות ידידותי.",
    rating: 4.0,
    visit_duration_min: 75,
    address: "1 Rue de Turenne, 68000 Colmar",
    price_range: "€",
    food_specialties: ["Tarte Flambée", "Choucroute", "Fleischkiechle"],
    tags: ["winstub", "local-favorite", "authentic", "colmar"],
    must_see: false,
  },
  {
    name: "Pont Fortifié de Kaysersberg",
    name_he: "הגשר המבוצר של קייזרסברג",
    category: "viewpoint",
    subcategory: "landmark",
    lat: 48.1394,
    lng: 7.2636,
    description:
      "15th-century fortified bridge over the Weiss river, one of the most recognizable landmarks in Alsace. The chapel on the bridge creates a stunning photo opportunity.",
    description_he:
      "גשר מבוצר מהמאה ה-15 מעל נהר ה-Weiss, מהמקומות המזוהים ביותר באלזס. הקפלה על הגשר יוצרת הזדמנות צילום מדהימה.",
    rating: 4.5,
    visit_duration_min: 15,
    address: "Pont Fortifié, 68240 Kaysersberg",
    tags: ["bridge", "fortified", "landmark", "photography", "iconic"],
    must_see: true,
  },
];

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await sql`DELETE FROM itinerary_stops`;
  await sql`DELETE FROM bookmarks`;
  await sql`DELETE FROM itineraries`;
  await sql`DELETE FROM chat_messages`;
  await sql`DELETE FROM pois`;

  // Reset sequences
  await sql`ALTER SEQUENCE pois_id_seq RESTART WITH 1`;

  for (const poi of pois) {
    await sql`
      INSERT INTO pois (
        name, name_he, category, subcategory, lat, lng,
        description, description_he, rating, visit_duration_min,
        address, website, price_range, wine_varieties,
        food_specialties, tags, must_see
      ) VALUES (
        ${poi.name}, ${poi.name_he}, ${poi.category}, ${poi.subcategory || null},
        ${poi.lat}, ${poi.lng}, ${poi.description}, ${poi.description_he},
        ${poi.rating || null}, ${poi.visit_duration_min || null},
        ${poi.address || null}, ${poi.website || null}, ${poi.price_range || null},
        ${poi.wine_varieties ? sql.array(poi.wine_varieties) : null},
        ${poi.food_specialties ? sql.array(poi.food_specialties) : null},
        ${poi.tags ? sql.array(poi.tags) : null},
        ${poi.must_see || false}
      )
    `;
  }

  // Create a default itinerary for the trip
  await sql`
    INSERT INTO itineraries (name, start_date, end_date, share_token)
    VALUES ('טיול אלזס אפריל 2026', '2026-04-14', '2026-04-23', 'alsace-apr-2026')
  `;

  console.log(`Seeded ${pois.length} POIs and 1 default itinerary`);
  await sql.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
