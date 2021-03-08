import React, { createContext, useReducer } from "react";
import { authReducer } from "./auth";
import decode from "jwt-decode";

const authInitialState = {
  user: null,
};

if (localStorage.getItem("Token")) {
  const decodedToken = decode(localStorage.getItem("Token"));

  if (decodedToken.exp * 2000 < Date.now()) {
    localStorage.removeItem("Token");
  } else {
    authInitialState.user = decodedToken;
  }
}

const StoreContext = createContext({ user: null });

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const login = (userData) => {
    localStorage.setItem("Token", userData.authToken);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("Token");
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
