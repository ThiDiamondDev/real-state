// LanguageContext.tsx
import React from "react";
import { Language, translations } from "../data/translations";

export const LanguageContext = React.createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)["en"];
}>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});
