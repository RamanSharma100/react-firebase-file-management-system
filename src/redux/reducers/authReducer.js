const initialState = {
  isLoggedIn: false,
  user: null,
  userId: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};
export default authReducer;
