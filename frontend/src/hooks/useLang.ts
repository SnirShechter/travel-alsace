import { createContext, useContext } from "react";
import type { Lang } from "../i18n/translations";

export interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  dir: "rtl" | "ltr";
}

export const LangContext = createContext<LangContextType>({
  lang: "he",
  setLang: () => {},
  dir: "rtl",
});

export function useLang() {
  return useContext(LangContext);
}
