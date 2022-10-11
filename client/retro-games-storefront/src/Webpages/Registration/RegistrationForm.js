import React, { useState, useContext  } from "react";
import {Link, useHistory} from "react-router-dom";

import "./RegistrationForm.css";
import FormHelper from "../../Components/Forms/FormHelper"
import AuthContext from "../../Components/AuthContext/AuthContext";

const DEFAULT_USER = {
    username: "",

    
};

function RegistrationForm() {

    // const [email, setEmail] = useState(null);
    // const [password, setPassword] = useState(null);
    // const [confirmPassword, setConfirmPassword] = useState(null);

    const [user, setUser]= useState(DEFAULT_USER);

    const auth = useContext(AuthContext);

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
    const newUser = {...user};
    newUser[event.target.name] = event.target.value;
    setUser(newUser);
}

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newUser = {...user};

    const init = {
       method: "POST",
       headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
       },
       body: JSON.stringify(newUser)
    };
    fetch ("http://localhost:8080/create_account", init)
    .then(async response => {
        if (response.status === 201) {
            return response.json();
        } return Promise.reject (await response.json());
    })
    .then (userInfo => {
        history.push("/")
    })
    // Temporary
    .catch ((errorMessages) => {
        console.log(errorMessages)
    });

  };

  return (

<div className="container">

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
          {/* <FormHelper
            inputType={"password"}
            identifier={"confirmPassword"}
            labelText={"Confirm Password:"}
            newVal={user.confirmPassword}
            onChangeHandler={handleChange}
          /> */}
           <button className="btn btn-success" id="save">Register</button>
          <Link to="/" className="btn btn-danger" id="cncl">
            Cancel
          </Link>
        </form>
    </div>
          


    /* <div className="form" id="register">
            <div className="form-body">
                <div className="email">
                    <label className="form__label" htmlFor="email">Email </label>
                    <input  type="email" id="email" className="form__input" value={email} onChange = {(r) => handleChange(r)} placeholder="Email"/>
                </div>
                <div className="password">
                    <label className="form__label" htmlFor="password">Password </label>
                    <input className="form__input" type="password"  id="password" value={password} onChange = {(r) => handleChange(r)} placeholder="Password"/>
                </div>
                <div className="confirm-password">
                    <label className="form__label" htmlFor="confirmPassword">Confirm Password </label>
                    <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(r) => handleChange(r)} placeholder="Confirm Password"/>
                </div>
            </div>
            <div className="footer">
                <button onClick={()=>handleSubmit()} type="submit" className="btn">Register</button>
            </div>
        </div> */
  );
}

export default RegistrationForm;
