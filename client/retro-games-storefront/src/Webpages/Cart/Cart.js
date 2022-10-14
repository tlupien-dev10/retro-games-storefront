import { useContext } from 'react';
import CartContext from '../../Components/CartContext/CartContext';
import './Cart.css';

function Cart() {
    const cart = useContext(CartContext);

    return (
        <div>
            <p>This is the cart.</p>
            {cart.listings.map(l => <p>{l}</p>)}
        </div>
    )
}

export default Cart;