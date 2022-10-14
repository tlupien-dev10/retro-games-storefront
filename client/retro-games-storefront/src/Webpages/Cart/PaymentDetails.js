import {PaymentElement, useStripe, useElements} from "@stripe/react-stripe-js"

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
                return_url: window.location.origin // take us back to home page rn; should have purchase success confirm
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
            <button>Pay Now</button>
            <Link className="btn" to="/">Cancel</Link> {
                // maybe make this pretty / make it a button; if button make sure not submit (default)
            }
        </form>
    );
}

export default PaymentDetails