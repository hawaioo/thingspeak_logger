import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

const GOOGLE_API_KEY = ""; // Add GoogleAPIKey to use Google maps

Vue.use(VueAxios, axios);
Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_API_KEY
  }
});
new Vue({
  render: h => h(App)
}).$mount("#app");
