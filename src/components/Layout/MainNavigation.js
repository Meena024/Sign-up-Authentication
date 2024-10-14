import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import AuthContext from "../../store/Auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      authCtx.setLastLoadedTime(Date.now());
    }
  }, [location, isLoggedIn, authCtx]);

  useEffect(() => {
    let interval;
    if (isLoggedIn) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const timeDifference = currentTime - authCtx.lastLoadedTime;

        if (timeDifference >= 5 * 60 * 1000) {
          authCtx.logout();
          clearInterval(interval);
        }
      }, 30000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLoggedIn, authCtx]);

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={authCtx.logout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
