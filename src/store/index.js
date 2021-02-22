import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      keycloakUserId: null,
      fullName: null,
      profile: {
        title: null,
        major: null,
        currentUniversity: null,
        about: null,
        employment: [],
        education: []
      },
      settings: {
        subscriptionsEmail: null,
        subscriptionsSms: null,
        targetedAdvertising: null,
        language: null
      }
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
