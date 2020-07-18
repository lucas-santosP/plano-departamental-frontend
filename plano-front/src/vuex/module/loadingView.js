import { SHOW_LOADING_VIEW, HIDE_LOADING_VIEW } from "../mutation-types";

const state = {
  loadingViewVisibility: false,
};

const mutations = {
  [SHOW_LOADING_VIEW](state) {
    state.loadingViewVisibility = true;
  },
  [HIDE_LOADING_VIEW](state) {
    state.loadingViewVisibility = false;
  },
};

const actions = {
  showLoadingView({ commit }) {
    commit("SHOW_LOADING_VIEW");
  },
  hideLoadingView({ commit }) {
    commit("HIDE_LOADING_VIEW");
  },
};

const getters = {
  loadingViewVisibility(state) {
    return state.loadingViewVisibility;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
