import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/Auth-context";

function App() {
  const authCtxt = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {authCtxt.isLoggedIn && <HomePage />}
          {!authCtxt.isLoggedIn && <Redirect to="/auth" />}
          {/* <HomePage /> */}
        </Route>
        {!authCtxt.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {authCtxt.isLoggedIn && <UserProfile />}
          {!authCtxt.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/"></Redirect>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
