import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect  } from "react-router-dom";
import jwtDecode from "jwt-decode";

import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
// import Carousel from "./Webpages/Homepage/Carousel";

import RequiredAuth from "./Components/RequiredAuth";
import RegistrationForm from "./Webpages/Registration/RegistrationForm";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import Homepage from "./Webpages/Homepage/Homepage";
import Listings from "./Webpages/Listing/Listings";
import ListingId from "./Webpages/ListingId/ListingId";
import NotFound from "./Webpages/NotFound/NotFound";
import Login from "./Webpages/LoginPage/LoginPage";
import AdminItem from "./Webpages/Admin/AdminItem";
import AdminOrder from "./Webpages/Admin/AdminOrder";
import AuthContext from "./Components/AuthContext/AuthContext";




const LOCAL_STORAGE_TOKEN_KEY = "retroGamesToken";



function App() {


const [user, setUser] = useState(null);
const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

useEffect (() => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  if (token) {
    login(token);
  }
  setRestoreLoginAttemptCompleted(true);
},
[]);



const login = (token) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);


  const {sub: username, authorities: authoritiesString} = jwtDecode(token);

  const roles = authoritiesString.split(',');

  console.log(roles);

  const user = {
    username,
    roles,
    token,
    hasRole: function(role) {
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
    <div className="App container">
      <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route path ="/login">
            <Login />
          </Route>

          <Route path="/register">
            <RegistrationForm />
          </Route>

          <Route exact path="/listing">
            <Listings />
          </Route>
          <Route path="/listing/:id">
            <ListingId />
          </Route>
      
          {/* <Route exact path="/admin/items">
             {user.roles === null || !user.roles.includes("admin") ?
            <AdminItem /> : <Redirect to="/" />}
          </Route> */}
          {/* {user.role ==="admin" ? (
            <Route exact path ="/admin/items">
              <AdminItem />
              ) : (<Redirect to="/" />
              )
            </Route> */}

            <Route exact path ="/admin/items">
              {auth.user && auth.user.hasRole("ADMIN") ?
              <AdminItem /> : <Redirect to="/" />}
          </Route> 
          <Route exact path ="/admin/orders">
              {auth.user && auth.user.hasRole("ADMIN") ?
              <AdminOrder /> : <Redirect to="/" />}
          </Route>

         

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
      </AuthContext.Provider>
      </div> 
  );
}


export default App;
