import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en.json';
import translationAR from './locales/ar.json';

// Initialize i18next
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      ar: {
        translation: translationAR,
      },
    },
    fallbackLng: 'ar', // Fallback language
    debug: true, // Enable debug mode
    detection: {
      order: ['navigator', 'localStorage', 'htmlTag', 'path', 'subdomain'],
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
