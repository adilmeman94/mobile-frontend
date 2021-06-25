export const setAuth = (value) => {
  return (dispatch) => dispatch({ type: "SET_AUTH", payload: value });
};

export const purgeAuth = () => {
  return (dispatch) => dispatch({ type: "PURGE_AUTH" });
};
