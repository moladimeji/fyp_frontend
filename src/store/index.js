import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});
export default createStore({
  state: {
    logged : false,
    email: "",
    normalKey: "",
    secretKey: "",
    Region: "",
    trails: {},
    logs: "",
    accessToken: null,
    refreshToken: null,

  },
  getters: {
  },
  mutations: {
    toggleLogin(state) {
      state.logged = true
    },
    setEmail(state, value) {
      state.email = value;
    },
    setnormalKey(state, value) {
      state.normalKey = value;
    },
    setsecretKey(state, value) {
      state.secretKey = value;
    },
    setRegion(state, value) {
      state.Region = value;
    },
    setTrails(state, value) {
      state.trails = value;
    },
    setLogs(state, value) {
      state.logs = value;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setRefreshToken(state, token) {
      state.refreshToken = token;
    },
  },
  actions: {
    setEmail({ commit }, newValue) {
      commit('setEmail', newValue);
    },
    setnormalKey({ commit }, newValue) {
      commit('setnormalKey', newValue);
    },
    setsecretKey({ commit }, newValue) {
      commit('setsecretKey', newValue);
    },
    setRegion({ commit }, newValue) {
      commit('setRegion', newValue);
    },
    setTrails({ commit }, newValue) {
      commit('setTrails', newValue);
    },
    setLogs({ commit }, newValue) {
      commit('setLogs', newValue);
    },
  },
  modules: {
  },
  plugins: [vuexLocal.plugin],
});

