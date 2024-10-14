import React, { useState, useEffect } from "react";

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
  const [lastLoadedTime, setLastLoadedTime] = useState(Date.now());

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    updateLastLoadedTime(0);
  };

  const updateLastLoadedTime = (time) => {
    setLastLoadedTime(time);
  };

  useEffect(() => {
    updateLastLoadedTime(Date.now());
  }, []);

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
