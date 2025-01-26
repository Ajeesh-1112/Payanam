import { createI18n } from "vue-i18n";

import en from "./locales/en.json";
import tn from "./locales/tn.json";
import hn from "./locales/hn.json";

const messages = {
  en,
  tn,
  hn,
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
