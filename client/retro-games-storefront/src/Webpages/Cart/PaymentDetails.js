import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js"
import {Link} from 'react-router-dom';
import "./PaymentDetails.css"
import {useState} from 'react';

function PaymentDetails({cart, setCart}) {
    const stripeHandle = useStripe();
    const elementHandle = useElements();
    const [errors, setErrors] = useState([]);

    async function purchaseHandler(evt) {
        evt.preventDefault();
        if (!stripeHandle || !elementHandle) {
            return;
        }

        const newCart = {listings: [...cart]};
        // this step is necessary to parse the json later, since it's (the cart) an array, not an object when passed in here

        localStorage.setItem('cart', JSON.stringify(newCart));

        const res = stripeHandle.confirmPayment({
            elements: elementHandle,
            confirmParams: {
                return_url: "http://localhost:3000/payment/success" 
            }
        })

        if (res.error !== null) {
            

            setErrors([(await res).error.message]);
            
        } 
    
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