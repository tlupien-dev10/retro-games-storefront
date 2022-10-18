import { useEffect, useState } from "react";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";

function SuccessPurchase(){

    const[errors, setErrors] = useState([]);
    const auth = useAuth();

    const cart = localStorage.getItem('myCart');
    const customer = {username: auth.username};
    const newCart = {...cart};
    newCart.customer = customer;
    console.log(newCart);

    function orderComplete(){
    const init = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user.token}`,
        },
        body: JSON.stringify(newCart),
      };

      fetch("http://localhost:8080/api/order", init)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        return Promise.reject(res.json());
      })
      .then((res) => {
        console.log(res);
      })
      .catch(setErrors(["Order Not recorded"])); //Should not ever hit this error unless server is off. But then card can't be charged anyways
};

useEffect(() => orderComplete, []);


    return (
        <>
        <h2>Purchase Successful!</h2>
        <PageErrors errors = {errors} />
        </>
    )

}

export default SuccessPurchase;


