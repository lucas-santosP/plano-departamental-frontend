import Vue from "vue";
import { SET_LOADING } from "../mutation-types";

const state = {
  onLoading: {
    partial: false,
    table: false,
    fetching: false,
    route: false,
  },
};

const mutations = {
  [SET_LOADING](state, data) {
    Vue.set(state.onLoading, data.type, data.value);
  },
};

const actions = {
  setLoading({ commit }, { type, value }) {
    if (type === "fetching") {
      commit(SET_LOADING, { type, value });
    } else {
      if (value) commit(SET_LOADING, { type, value });
      else setTimeout(() => commit(SET_LOADING, { type, value }), 300); //Tempo mínimo de espera
    }
  },
};

const getters = {
  onLoading(state) {
    return state.onLoading;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
