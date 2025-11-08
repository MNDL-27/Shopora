import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import LanguageDetector from 'i18next-http-middleware';
import path from 'path';

const localesPath = path.join(process.cwd(), 'backend', 'locales');

i18next
  .use(Backend)
  .use(LanguageDetector.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en'],
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: path.join(localesPath, '{{lng}}/{{ns}}.json'),
    },
    detection: {
      order: ['header', 'querystring', 'cookie'],
      caches: [],
    },
  });

export default i18next;
