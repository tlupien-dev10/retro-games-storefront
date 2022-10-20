import { useEffect, useState } from "react";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";
import "./SuccessPurchase.css";

function SuccessPurchase(){

  const[errors, setErrors] = useState([]);
  const[orderId, setOrderId] = useState(0);
  const auth = useAuth();


  const cart = JSON.parse(localStorage.getItem('cart'));
  
  const newCart = {...cart};
  newCart.username = auth.user.username;
  

  function orderComplete(){
    if (!localStorage.getItem('cart')) {
      return;
    }
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
          localStorage.removeItem('cart');
          return res.json();
        }
        return Promise.reject("error");
      })
      .then((res) => {
        setOrderId(res.id);
      })
      .catch(err => {
        if (err instanceof TypeError) {
          setErrors("Could not connect to api");
        } else {
          setErrors(err);
        }
      }); //Should not ever hit this error unless server is off. But then card can't be charged anyways
  };

  useEffect(() => {
    return orderComplete
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


    return (
      <div id="purchaseSuccess">
        <h2>Purchase Successful!</h2>
        <h5 id="purchaseId">Thank you for your purchase. Your Order ID is {orderId} and should arrive in 1-14 business days.</h5>
        <PageErrors errors = {errors} />
      </div>
    )

}

export default SuccessPurchase;


