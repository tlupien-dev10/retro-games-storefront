import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext/AuthContext";
import "./NavigationBar.css";

function NavigationBar() {
    const authorization = useContext(AuthContext);

    return (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {authorization.user ? (
              <li>
                <Link to="/products">Products</Link>
              </li>
            ) : (
              <>
                <li class="right-align">
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
          {authorization.user && (
            <div>
              Welcome {authorization.user.username}!
              <button onClick={() => authorization.logout()}>Logout</button>
            </div>
          )}
        </nav>
      );
    }
    
    export default NavigationBar;