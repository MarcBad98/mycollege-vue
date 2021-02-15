import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      keycloakUserId: "",
      settings: {
        subscriptionsEmail: null,
        subscriptionsSms: null,
        targetedAdvertising: null,
        language: ""
      }
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
