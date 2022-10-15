import { useContext } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import "./NavigationBar.css";

function NavigationBar() {
  const auth = useAuth();


  

  return (
    <div>
     {/* <ul id="dropdown1" className="dropdown-content">
      <li><Link to="/admin/items">Admin-Items</Link></li>
      <li><Link to="/admin/orders">Admin-Orders</Link></li>
    </ul> */}
    <nav>
      <div className="nav-wrapper purple">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/listing">Listing</Link>
        </li>
        {auth.user && auth.user.hasRole("ADMIN") ? (
          //  <li><a className="dropdown-trigger" data-target="dropdown1" >Admin Options<i className="material-icons right">arrow_drop_down</i></a></li>
          <>
          <li><Link to="/admin/items">Admin-Items</Link></li>
          <li><Link to="/admin/orders">Admin-Orders</Link></li>
          </>
        ) : (
          <>
            <li className="right-align">
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
      {auth.user && (
        <div id="welcome" className="center">
          Welcome {auth.user.username}!
          <button id="logout-button" onClick={() => auth.logout()}>Logout</button>
          <Link id="cart-icon" to="/cart"><i className="material-icons right">shopping_cart</i></Link>
        </div>
        
      )}
      </div>
    </nav>
    </div>

  );
  
}

export default NavigationBar;
