import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          nav: {
            planning: "Planning",
            vendors: "Vendors",
            guests: "Guests",
            websites: "Websites",
            inspiration: "Inspiration",
            shop: "Shop",
            login: "Log In",
            getStarted: "Get Started"
          },
          hero: {
            headline: {
              prefix: "Plan Less,",
              celebrate: "Celebrate More.",
              stress: "Stress Less.",
              dream: "Dream Bigger.",
              party: "Party Harder."
            },
            subhead: "The all-in-one marketplace for venues, vendors, and planning tools. Discover inspiration and manage every detail in one place.",
            search: "Search",
            browse: "Browse",
            searchPlaceholder: "Search...",
            join: "Join {{countVal}}+ couples planning today",
            typing: ["Celebrate More.", "Stress Less.", "Dream Bigger.", "Party Harder."]
          },
          tabs: {
            venues: "Venues",
            vendors: "Vendors",
            planning: "Planning",
            inspiration: "Inspiration"
          }
        }
      },
      sw: {
        translation: {
          nav: {
            planning: "Mipango",
            vendors: "Wauzaji",
            guests: "Wageni",
            websites: "Tovuti",
            inspiration: "Hamasa",
            shop: "Duka",
            login: "Ingia",
            getStarted: "Anza Sasa"
          },
          hero: {
            headline: {
              prefix: "Punguza Mipango,",
              celebrate: "Sherehekea Zaidi.",
              stress: "Punguza Mawazo.",
              dream: "Ota Ndoto Kubwa.",
              party: "Sherehekea Sana."
            },
            subhead: "Soko la kila kitu kwa ajili yaumbi, wauzaji, na zana za kupanga. Gundua hamasa na simamia kila undani mahali pamoja.",
            search: "Tafuta",
            browse: "Vinjari",
            searchPlaceholder: "Tafuta...",
            join: "Jiunge na wanandoa {{countVal}}+ wanaopanga leo",
            typing: ["Sherehekea Zaidi.", "Punguza Mawazo.", "Ota Ndoto Kubwa.", "Sherehekea Sana."]
          },
          tabs: {
            venues: "Ukumbi",
            vendors: "Wauzaji",
            planning: "Mipango",
            inspiration: "Hamasa"
          }
        }
      }
    }
  });

export default i18n;
