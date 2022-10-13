import { useContext } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import "./NavigationBar.css";

function NavigationBar() {
  const auth = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/listing">Listing</Link>
        </li>
        {auth.user && auth.user.hasRole("ADMIN") ? (
          <li>
            <Link to="/admin/items">Admin-Items</Link>
            {/* <Link to="/admin/orders">Admin-Orders</Link> */}
          </li>
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
        <div>
          Welcome {auth.user.username}!
          <button onClick={() => auth.logout()}>Logout</button>
        </div>
      )}
    </nav>
  );
  
//   return (
//     <div>
// <ul id="dropdown1" class="dropdown-content">
//   <li><a href="#!">one</a></li>
//   <li><a href="#!">two</a></li>
//   <li class="divider"></li>
//   <li><a href="#!">three</a></li>
// </ul>
// <nav>
//   <div class="nav-wrapper">
//     <a href="#!" class="brand-logo">Logo</a>
//     <ul class="right hide-on-med-and-down">
//       <li><a href="sass.html">Sass</a></li>
//       <li><a href="badges.html">Components</a></li>
//       <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li>
//     </ul>
//   </div>
// </nav>
// </div>
//   );
}

export default NavigationBar;
