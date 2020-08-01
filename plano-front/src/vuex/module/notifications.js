const state = {
  queue: [],
  max: 5,
};

const mutations = {
  pushNotification(state, { type = "success", title, text }) {
    state.queue.push({ type, title, text });

    if (state.queue.length > state.max) state.queue.shift();
  },
};

export default {
  state,
  mutations,
};
