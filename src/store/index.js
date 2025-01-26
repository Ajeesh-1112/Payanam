import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {
    bookingdata: null,
    userdata: null,
  },
  mutations: {
    bookingDetails(state, data) {
      state.bookingdata = data;
    },
    userDetails(state, data) {
      state.userdata = data;
      console.log(state.userdata);
    },
  },
  plugins: [createPersistedState()],
});

export default store;
