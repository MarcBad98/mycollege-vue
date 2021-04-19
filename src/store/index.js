import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      keycloakUserId: null,
      isPlusUser: null,
      profile: {
        fullName: null,
        university: null,
        major: null,
        about: null,
        employment: [],
        education: []
      },
      settings: {
        subscriptionsEmail: null,
        subscriptionsSms: null,
        targetedAdvertising: null,
        language: null
      },
      friends: [],
      jobsSaved: []
    },
    jobs: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setJobs(state, jobs) {
      state.jobs = jobs;
    },
    createJob(state, job) {
      state.jobs.push(job);
    },
    updateJob(state, job) {
      const idx = state.jobs.findIndex(storeJob => storeJob.id === job.id);
      state.jobs.splice(idx, 1, job);
    },
    deleteJob(state, job) {
      const idx = state.jobs.findIndex(storeJob => storeJob.id === job.id);
      state.jobs.splice(idx, 1);
    },
    starJob(state, jobId) {
      const job = state.jobs.find(storeJob => storeJob.id === jobId);
      job.metadata.userHasSaved = !job.metadata.userHasSaved;
    }
  },
  actions: {},
  modules: {}
});
