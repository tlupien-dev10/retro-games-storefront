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

import {loadStripe} from '@stripe/stripe-js';
import SuccessPurchase from "./Webpages/SuccessPurchase/SuccessPurchase";
import FailedPayment from "./Webpages/FailedPayment/FailedPayment";




const LOCAL_STORAGE_TOKEN_KEY = "retroGamesToken";

const stripePromise = loadStripe("pk_test_51Lsu0RK0z3kkSqwsoh0VVVF0sHUR4apYBXHLnJ18GBYkbHtdya3mpVlpbecK1sby6WOqWCKMPvBPDtFlwh1AAqaN00qQfz5m1d");
// this pulls stripe elements and such (later)
// which will be accessed in the checkout component (so pass this promise to the cart page)
function App() {


const [user, setUser] = useState(null); // so like this (see comment near cart-provider)
const [cartListings, setCartListings] = useState([]);
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

  return (
    <div id="appCt" className="App container">
      <AuthContext.Provider value={auth}>
      {/* <CartContext.Provider value={cart}> this might need to be a state instead because there's no setter on the context */
      // because there will be a need to redraw when the cart changes (because the state is never invalidated)
      // so there needs to be state-tracking in the app (go to line 38)
  }
      <BrowserRouter>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path ="/login">
            <Login />
          </Route>

          <Route exact path = "/login/cart">
            <Login hasCart={true}/>
          </Route>

          <Route exact path = "/login/review">
            <Login toReview={true}/>
          </Route>

          <Route path="/register">
            <RegistrationForm />
          </Route>

          <Route exact path="/listing">
            <Listings cartListings={cartListings} setCartListings={setCartListings}/>
          </Route>
          
          <Route path="/listing/:id">
            <ListingId />
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
          {auth.user && auth.user.hasRole("ADMIN") ?
            <AdminAddForm /> : <Redirect to="/" />}
          </Route>

          <Route exact path="/admin/edit/:editId">
            {auth.user && auth.user.hasRole("ADMIN") ?
            <AdminAddForm /> : <Redirect to="/" />}
          </Route>

          <Route path = "/cart">
            {auth.user ?
            <Cart stripePromise={stripePromise}  cart={cartListings} setCart={setCartListings}/> : <Redirect to="/login" />}
          </Route>

          <Route path = "/payment/success">
              {auth.user ?
              <SuccessPurchase></SuccessPurchase> : <Redirect to="/" />}
          </Route>

          <Route path = "/payment/failure">
            {auth.user ?
            <FailedPayment></FailedPayment> : <Redirect to="/" />}
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
      {/* </CartContext.Provider> */}
      </AuthContext.Provider>
      
      </div> 
  );
}


export default App;
