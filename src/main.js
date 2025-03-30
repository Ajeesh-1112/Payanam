import { createApp } from "vue";
import App from "./App.vue";
import router from "./Router";
import axios from "axios";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import "vuetify/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@mdi/font/css/materialdesignicons.css";
import i18n from "./i18n";
import store from './store';
axios.defaults.withCredentials = true;

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
 
});

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.use(i18n);
app.use(vuetify);
app.use(store);
app.use(router);
app.mount("#app");
