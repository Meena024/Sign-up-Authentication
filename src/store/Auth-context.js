import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  lastLoadedTime: 0,
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [lastLoadedTime, setLastLoadedTime] = useState(
    initialToken ? Date.now() : 0
  );

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    setLastLoadedTime(Date.now());
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    setLastLoadedTime(0);
  };

  const updateLastLoadedTime = (time) => {
    setLastLoadedTime(time);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    lastLoadedTime: lastLoadedTime,
    setLastLoadedTime: updateLastLoadedTime,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
