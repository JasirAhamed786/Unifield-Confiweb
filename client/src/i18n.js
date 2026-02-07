import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Welcome": "Welcome",
      "Search": "Search crops, prices, or schemes...",
      "Ask Expert": "Ask Expert"
    }
  },
  hi: {
    translation: {
      "Welcome": "स्वागत",
      "Search": "फसलें, कीमतें या योजनाएं खोजें...",
      "Ask Expert": "विशेषज्ञ से पूछें"
    }
  },
  es: {
    translation: {
      "Welcome": "Bienvenido",
      "Search": "Buscar cultivos, precios o esquemas...",
      "Ask Expert": "Preguntar al Experto"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
