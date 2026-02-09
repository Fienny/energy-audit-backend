import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import ru from "../locales/ru/translation.json";
import uz from "../locales/uz/translation.json";
import en from "../locales/en/translation.json";

const resources = {
  ru: { translation: ru },
  uz: { translation: uz },
  en: { translation: en },
};

i18n
  .use(LanguageDetector) // определит язык браузера + localStorage
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru",
    supportedLngs: ["ru", "uz", "en"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "benka_lang",
    },
  });

export default i18n;
