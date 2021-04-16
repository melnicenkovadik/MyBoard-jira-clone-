export default {
  isLoggedIn: (state) => {
    try {
      return state.user.uid !== null;
    } catch {
      return false;
    }
  },
};
