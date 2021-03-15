import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      keycloakUserId: null,
      fullName: null,
      profile: {
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
    },
    friendsRequests: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setFriendsRequests(state, friendsRequests) {
      state.friendsRequests = friendsRequests;
    },
    addFriendsRequest(state, friendsRequest) {
      state.friendsRequests.push(friendsRequest);
    },
    updateFriendsRequest(state, friendsRequest) {
      const idx = state.friendsRequests.findIndex(
        request => request.pairing === friendsRequest.pairing
      );
      state.friendsRequests.splice(idx, 1, friendsRequest);
    },
    deleteFriendsRequest(state, friendsRequest) {
      const idx = state.friendsRequests.findIndex(
        request => request.pairing === friendsRequest.pairing
      );
      state.friendsRequests.splice(idx, 1);
    }
  },
  actions: {},
  modules: {}
});
