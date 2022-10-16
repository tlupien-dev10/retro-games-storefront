import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./RegistrationForm.css";
import FormHelper from "../../Components/Forms/FormHelper";
import PageErrors from "../../Components/PageErrors/PageErrors";

const DEFAULT_USER = {
  username: "",
};

function RegistrationForm() {

  const [user, setUser] = useState(DEFAULT_USER);

  const [error, setError] = useState([]);

  const history = useHistory();

  const handleChange = (event) => {
    const newUser = { ...user };
    newUser[event.target.name] = event.target.value;
    setUser(newUser);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newUser = { ...user };

    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    };
    fetch("http://localhost:8080/api/auth/create_account", init)
      .then(async (response) => {
        if (response.status === 201) {
          return response.json();
        }
        return Promise.reject(await response.json());
      })
      .then((userInfo) => {
        history.push("/login");
      })
      // Temporary
      .catch((err) => setError([...err]));
  };

  return (
    <div className="container" id="registerDiv">

      <form onSubmit={handleSubmit}>
        <h3 id="formTitle">Register</h3>
        <FormHelper
          inputType={"text"}
          identifier={"username"}
          labelText={"Email:"}
          newVal={user.email}
          onChangeHandler={handleChange}
        />
        <FormHelper
          inputType={"password"}
          identifier={"password"}
          labelText={"Password:"}
          newVal={user.password}
          onChangeHandler={handleChange}
        />
      
        <button className="btn btn-success" id="register">
          Register
        </button>
        <Link to="/login" className="btn btn-danger" id="cancel">
          Cancel
        </Link>
      </form>
      <PageErrors errors={error} />
    </div>

    
  );
}

export default RegistrationForm;
