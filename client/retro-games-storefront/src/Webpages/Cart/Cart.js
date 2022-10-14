import { useContext, useState } from 'react';
import './Cart.css';
import {Elements} from '@stripe/react-stripe-js';
import CartItem from './CartItem';
import PaymentDetails from './PaymentDetails';


function Cart({stripePromise, cart}) {
    // const cart = useContext(CartContext);

    // take in stripe promise
    // need to be able to get the client secret here
    const [clientSecret, setClientSecret] = useState("");

    function handlePurchase() {
        // this retrieves the client secret (from the stripe part of our backend)
        // and needs to send quantities and prices to it (so the listings in the cart, but in a format stripe likes)
        // items need SKUs (maybe the item id)
        fetch("http://localhost:8080/api/payment", {
            method: "POST",
            body: JSON.stringify(cart),
            header: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.user.token}`
            }
        }).then( res => {
            // text (the string of the client secret)
            // put error handling
            return res.text();
        }).then( clientSecret => {
            setClientSecret(clientSecret);
        }).catch(err => console.log(err)) // pls improve
    }

    function increaseQuantity(id) {
        // make these
    }

    function decreaseQuantity(id) {

    }

    function deleteItem(id) {

    }

    // 
    return (
        <div>
            <p>This is the cart.</p>
            {//put header in table
            }
            <table>
                <tbody>
                    {cart.map(l => {<CartItem listing={l} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} deleteItem={deleteItem}/>})}
                </tbody>
            </table>
            {
                // maybe total here
            }
            {clientSecret ?
            <Elements stripe={stripePromise} options={{clientSecret}}>
                <PaymentDetails/>
            </Elements>:
            <button type="button" onClick={handlePurchase}>Purchase</button>
            }
        </div>
    )
}

export default Cart;