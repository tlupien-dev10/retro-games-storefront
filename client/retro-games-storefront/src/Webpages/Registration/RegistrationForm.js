import React, { useState } from "react";
import {Link} from "react-router-dom";

import "./RegistrationForm.css";
import FormHelper from "../../Components/Forms/FormHelper"



function RegistrationForm() {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

  const handleChange = (r) => {
    const { id, value } = r.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

  };

  return (

<div className="container">

        <form onSubmit={handleSubmit}>
            <h2 id="formTitle">Register</h2>
          <FormHelper
            inputType={"text"}
            identifier={"email"}
            labelText={"Email:"}
            newVal={email}
            onChangeHandler={handleChange}
          />
          <FormHelper
            inputType={"password"}
            identifier={"password"}
            labelText={"Password:"}
            newVal={password}
            onChangeHandler={handleChange}
          />
          <FormHelper
            inputType={"password"}
            identifier={"confirmPassword"}
            labelText={"Confirm Password:"}
            newVal={confirmPassword}
            onChangeHandler={handleChange}
          />
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
