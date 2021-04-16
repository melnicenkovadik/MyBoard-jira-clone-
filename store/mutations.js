import initialState from './state';

export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState());
  },

  SET_AUTH_USER: (state, { user }) => {
    state.user = {
      uid: user.uid,
      email: user.email,
    };
  },
};
