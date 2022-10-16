import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import PageErrors from "../../Components/PageErrors/PageErrors";
import useAuth from "../../Components/Hooks/useAuth";
import "./LoginPage.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);

  // const auth = useContext(AuthContext);
  const auth = useAuth();

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/api/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  
    // This code executes if the request is successful
    if (response.status === 200) {
      const { jwt_token } = await response.json();
      console.log(jwt_token);
      auth.login(jwt_token);
      history.push("/");
    } else if (response.status === 403) {
      setError(["Login failed. Invalid password"]);
    } else {
      setError(["Unknown error."]);
    }
  };

  return (
    <div id="loginForm">
      <h2 id="loginTitle">Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div id="loginData">
          
          <label id="username" htmlFor="username">Username:</label>
          <Link to={"/register"}>
        <button align-right className="btn btn-sm btn-success" id="loginRegister">
          New User?
        </button>
        </Link>
          <input
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            id="usernameInput"
          />
          
        </div>
        <div>
          <label id="password" htmlFor="password">Password:</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            id="passwordInput"
          />
        </div>
        <div>
        <button id="loginBtn" class="btn waves-effect waves-light" type="submit" name="action">Login
    <i class="material-icons right">send</i>
  </button>
    <div id="loginCancelDiv">
        <Link to={"/"}>
        <button className="btn btn-sm btn-success" id="loginCancel">
          Cancel
        </button>
        </Link>
        </div>
        </div>
      </form>
      <PageErrors errors={error} />
    </div>
  );
}

//