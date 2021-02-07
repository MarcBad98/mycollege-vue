import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Bulma from "bulma/bulma.sass";
import Buefy from "buefy";

import VueKeyCloak from "@dsb-norge/vue-keycloak-js";
import axios from "axios";
import { createProvider } from "./vue-apollo";

Vue.config.productionTip = false;

Vue.use(Bulma);
Vue.use(Buefy);

function tokenInterceptor() {
  axios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
}

Vue.use(VueKeyCloak, {
  config: {
    url: process.env.VUE_APP_SSO_URL,
    realm: process.env.VUE_APP_SSO_REALM,
    clientId: process.env.VUE_APP_SSO_CLIENT_ID
  },
  onReady: () => {
    tokenInterceptor();
    new Vue({
      router,
      store,
      apolloProvider: createProvider(),
      render: h => h(App)
    }).$mount("#app");
  }
});
