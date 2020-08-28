import {} from "../mutation-types";
import _ from "lodash";
const state = {
  PeriodosLetivos: [
    {
      id: 1,
      nome: "Primeiro",
    },
    {
      id: 2,
      nome: "Segundo (inverno)",
    },
    {
      id: 3,
      nome: "Terceiro",
    },
    {
      id: 4,
      nome: "Quarto (verão)",
    },
  ],
};

const mutations = {};

const getters = {
  PeriodosLetivos(state) {
    return state.PeriodosLetivos;
  },
};

export default {
  state,
  mutations,
  getters,
};
