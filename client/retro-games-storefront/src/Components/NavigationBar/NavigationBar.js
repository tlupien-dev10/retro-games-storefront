import { useContext } from "react";
import {Link} from "react-router-dom";
import AuthContext from "./AuthContext/AuthContext";

function NavigationBar() {
    const authorization = useContext(AuthContext);

    return (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {auth.user ? (
              <li>
                <Link to="/products">Products</Link>
              </li>
            ) : (
              <>
                <li>
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
    }
    
    export default NavigationBar;