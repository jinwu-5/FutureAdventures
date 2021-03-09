import React, { createContext, useReducer } from "react";
import { authReducer } from "./auth";
import decode from "jwt-decode";

const authInitialState = {
  user: null,
};

if (localStorage.getItem("token")) {
  const decodedToken = decode(localStorage.getItem("token"));

  if (decodedToken.exp * 2000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    authInitialState.user = decodedToken;
  }
}

const StoreContext = createContext({ user: null });

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const login = (userData) => {
    localStorage.setItem("token", userData.authToken);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <StoreContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { StoreContext, StoreProvider };
