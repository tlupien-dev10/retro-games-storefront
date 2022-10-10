import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";


import NavigationBar from "./Components/NavigationBar/NavigationBar";
import Homepage from "./Webpages/Homepage/Homepage";
import NotFound from "./Webpages/NotFound/NotFound";
import Login from "./Webpages/LoginPage/LoginPage";
import AuthContext from "./Components/AuthContext/AuthContext";


const LOCAL_STORAGE_TOKEN_KEY = "retroGamesToken";

function App() {

const [user, setUser] = useState(null);
const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

useEffect (() => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  if (token) {
    Login(token);
  }
  setRestoreLoginAttemptCompleted(true);
},
[]);

const login = (token) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);


const {sub: username, authorities: authoritiesString} = jwtDecode(token);

const roles = authoritiesString.split(',');

 user = {
  username,
  roles,
  token,
  hasRole(role) {
    return this.roles.includes(role);
  }
};

setUser(user);

return user;
};

const logout = () => {
  setUser(null);
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
};

const auth = {
  user: user ? {...user} : null,
  login,
  logout
};

if (!restoreLoginAttemptCompleted) {
  return null;
}

  return (
    <AuthContext.Provider value ={auth}>
  
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route path ="/login">
            <Login />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;
