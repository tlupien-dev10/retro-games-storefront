import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./RegistrationForm.css";
import FormHelper from "../../Components/Forms/FormHelper";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";

const DEFAULT_USER = {
  username: "",
};

function RegistrationForm() {
  // const [email, setEmail] = useState(null);
  // const [password, setPassword] = useState(null);
  // const [confirmPassword, setConfirmPassword] = useState(null);

  const [user, setUser] = useState(DEFAULT_USER);

  const [error, setError] = useState([]);

  const auth = useAuth();

  const history = useHistory();

  //   const handleChange = (r) => {
  //     const { id, value } = r.target;
  //     if (id === "email") {
  //       setEmail(value);
  //     }
  //     if (id === "password") {
  //       setPassword(value);
  //     }
  //     if (id === "confirmPassword") {
  //       setConfirmPassword(value);
  //     }
  //   };

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
    <div className="container">
      <PageErrors errors={error} />

      <form onSubmit={handleSubmit}>
        <h3 id="formTitle">Registration</h3>
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
      
        <button className="btn btn-success" id="save">
          Register
        </button>
        <Link to="/login" className="btn btn-danger" id="cncl">
          Cancel
        </Link>
      </form>
    </div>

    
  );
}

export default RegistrationForm;
