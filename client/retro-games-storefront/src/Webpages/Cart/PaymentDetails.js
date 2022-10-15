import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js"
import {Link} from 'react-router-dom';
import "./PaymentDetails.css"

function PaymentDetails() {
    const stripeHandle = useStripe();
    const elementHandle = useElements();

    async function purchaseHandler(evt) {
        evt.preventDefault();
        if (!stripeHandle || !elementHandle) {
            return;
        }

        const res = stripeHandle.confirmPayment({
            elements: elementHandle,
            confirmParams: {
                return_url: "http://localhost:3000/payment/success" // take us back to home page rn; should have purchase success confirm
            }
        })

        if (res.error) {
            console.log(res.error.message); //put error handling (show user pmt failed)
            alert("Payment failed.");
        } else {
            console.log(res); //TODO: update quantities here! (like the inventory quantities)
            // and create the orders object to send to backend
        }
    }

    return (
        <form onSubmit={purchaseHandler}>
            <PaymentElement/>
            <button id="payNowBtn" className="waves-effect waves-light btn-small">Pay Now</button>
            <Link id="cancelBtn" className="btn-small waves-effect waves-light red" to="/">Cancel</Link> {
                // maybe make this pretty / make it a button; if button make sure not submit (default)
            }
        </form>
    );
}

export default PaymentDetails