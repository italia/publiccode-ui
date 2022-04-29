import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../lang/en.json';
import it from '../lang/it.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
  },
  lng: 'en',

  interpolation: {
    escapealue: false,
  },
});

export default i18n;
