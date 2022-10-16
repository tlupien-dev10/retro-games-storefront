import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js"
import {Link} from 'react-router-dom';
import "./PaymentDetails.css"
import {useState} from 'react';
import useAuth from "../../Components/Hooks/useAuth";

function PaymentDetails({cart, cartSetter}) {
    const stripeHandle = useStripe();
    const elementHandle = useElements();
    const [errors, setErrors] = useState([]);
    const auth = useAuth();

    async function purchaseHandler(evt) {
        evt.preventDefault();
        if (!stripeHandle || !elementHandle) {
            return;
        }

        const res = stripeHandle.confirmPayment({
            elements: elementHandle,
            confirmParams: {
                return_url: "http://localhost:3000/payment/success" 
            }
        })

        if (res.error !== null) {
            console.log((await res).error.message); 

            setErrors([(await res).error.message]);
            console.log(errors);
            
        } else {
            console.log("This happened at least"); //I don't think it does...
            const customer = {app_user_id: auth.user.id, username: auth.user.username};
            const newCart = {...cart};
            newCart.customer = customer;
            cartSetter(newCart);
            const init = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${auth.user.token}`,
                },
                body: JSON.stringify(cart),
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
              .catch((err) => setErrors([...err]));
          };

        }


    return (
        <>
        <form onSubmit={purchaseHandler}>
            <PaymentElement/>
            <button id="payNowBtn" className="waves-effect waves-light btn-small">Pay Now</button>
            <Link id="cancelBtn" className="btn-small waves-effect waves-light red" to="/">Cancel</Link> {
                // maybe make this pretty / make it a button; if button make sure not submit (default)
            }
        </form>
        <div id="cartErrors">
            {errors.map(e => <p>{e}</p>)}
        </div>
        </>
    );
}

export default PaymentDetails