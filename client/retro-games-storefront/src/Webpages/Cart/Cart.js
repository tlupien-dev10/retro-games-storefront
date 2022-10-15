import { useContext, useState } from 'react';
import './Cart.css';
import {Elements} from '@stripe/react-stripe-js';
import CartItem from './CartItem';
import PaymentDetails from './PaymentDetails';
import useAuth from '../../Components/Hooks/useAuth';


function Cart({stripePromise, cart, setCart}) {
    // const cart = useContext(CartContext);

    // take in stripe promise
    // need to be able to get the client secret here
    const [clientSecret, setClientSecret] = useState("");
    const auth = useAuth();

    function handlePurchase() {
        // this retrieves the client secret (from the stripe part of our backend)
        // and needs to send quantities and prices to it (so the listings in the cart, but in a format stripe likes)
        // items need SKUs (maybe the item id)
        fetch("http://localhost:8080/api/payment", {
            method: "POST",
            body: JSON.stringify(cart),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.user.token}`
            }
        }).then( res => {
            // text (the string of the client secret)
            // put error handling
            if (res.status === 200) {
                return res.text();
            } else {
                console.log(res);
                return Promise.reject("Error");
            }
            
        }).then( clientSecret => {
            setClientSecret(clientSecret);
        }).catch(err => console.log(err)) // pls improve
    }

    function increaseQuantity(id) {
        const newCart = [...cart];
        newCart.find(l => l.id === id).orderedQuantity ++;
        setCart(newCart);
    }

    function decreaseQuantity(id) {
        const newCart = [...cart];
        newCart.find(l => l.id === id).orderedQuantity --;
        setCart(newCart);
    }

    function deleteItem(id) {
        const newCart = [...cart.filter(l => l.id != id)];
        setCart(newCart);
    }
    // 
    console.log(cart)
    return (
        <div>

            <h3>Cart Contents:</h3>      

            <table className="striped">
                <tbody>
                    {cart.map(l => <CartItem listing={l} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} deleteItem={deleteItem}/>)}
                </tbody>
            </table>
            {
                <div id="cartTotal">
                <h3>Total: ${cart.map((listing) => (
                    listing.orderedQuantity*listing.price)).reduce((a, b) => a + b, 0)}</h3>
                </div>
            }
            {clientSecret ?
            <Elements stripe={stripePromise} options={{clientSecret}}>
                <PaymentDetails/>
            </Elements>:
            <button type="button" className="btn-small waves-effect waves-light green" onClick={handlePurchase}>Purchase</button>
            }
        </div>
    )
}

export default Cart;