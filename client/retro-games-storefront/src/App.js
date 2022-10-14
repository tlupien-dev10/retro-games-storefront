import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect  } from "react-router-dom";
import jwtDecode from "jwt-decode";

import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
// import Carousel from "./Webpages/Homepage/Carousel";

import RegistrationForm from "./Webpages/Registration/RegistrationForm";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import Homepage from "./Webpages/Homepage/Homepage";
import Listings from "./Webpages/Listing/Listings";
import ListingId from "./Webpages/ListingId/ListingId";
import NotFound from "./Webpages/NotFound/NotFound";
import Login from "./Webpages/LoginPage/LoginPage";
import AdminItemHelper from "./Webpages/Admin/AdminItemHelper";
import AdminOrder from "./Webpages/Admin/AdminOrder";
import AuthContext from "./Components/AuthContext/AuthContext";
import AdminAddForm from "./Components/Forms/AdminAddForm";
import Cart from "./Webpages/Cart/Cart";
import CartContext from "./Components/CartContext/CartContext";

import CustomRoute from "./Components/CustomRoute/CustomRoute";




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
      return this.roles.includes("ROLE_" + role);
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

const cart = {
  listings: [],
  addToCart: function(listing) {cart.listings.push(listing)}
}

  return (
    <div className="App container">
      <AuthContext.Provider value={auth}>
      <CartContext.Provider value={cart}>
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

          <Route path="/create-checkout-session">
            <CustomRoute />
          </Route>

            <Route exact path ="/admin/items">
              {auth.user && auth.user.hasRole("ADMIN") ?
              <AdminItemHelper /> : <Redirect to="/" />}
          </Route> 

          <Route exact path ="/admin/orders">
              {auth.user && auth.user.hasRole("ADMIN") ?
              <AdminOrder /> : <Redirect to="/" />}
          </Route>

          <Route exact path ="/admin/add">
            <AdminAddForm />
          </Route>

          <Route path = "/cart">
            <Cart/>
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
      </CartContext.Provider>
      </AuthContext.Provider>
      
      </div> 
  );
}


export default App;
