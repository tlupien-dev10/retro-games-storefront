import {useState} from "react";
import {useHistory} from "react-router-dom";
import FormHelper from "../../Components/Forms/FormHelper";
import useAuth from "../../Components/Hooks/useAuth";
import "./AddToCartButton.css";


function AddToCartButton({listing, setListing,  cartListings, setCartListings}) {
    const [addedToCart, setAddedToCart] = useState(false);
    const history = useHistory();
    const auth = useAuth();

    const addToCart = function(evt) {
        evt.preventDefault();
        const newListing = {...listing};
        newListing.reviews = [];
        const newCartListings = [...cartListings]
        
        if (newCartListings.map(nL => {return nL.id}).includes(listing.id)) {
            let qty = parseInt(newCartListings.find(l => l.id === newListing.id).orderedQuantity)
            qty += parseInt(newListing.orderedQuantity);
            newCartListings.find(l => l.id === newListing.id).orderedQuantity = qty;
        } else {
            newListing.orderedQuantity = parseInt(newListing.orderedQuantity);
            newCartListings.push(newListing);
        }
        setCartListings(newCartListings)
        setAddedToCart(false) // yeah maybe a little confusing, but this resets the form

        if (!auth.user) {
            history.push('/login/cart')
        }
    }

    const confirmAdd = function(evt) {
        evt.preventDefault();
        setAddedToCart(true);
    }

    const denyAdd = function(evt) {
        evt.preventDefault();
        setAddedToCart(false);
    }

    const changeHandler = function(evt) {
        const newListing = { ...listing };
        newListing[evt.target.name] = evt.target.value;
        setListing(newListing);
    }

    return (
        <div id="addToCartDiv">
        { listing.quantity != 0 ?
            <>
            {!addedToCart ?
                <form onSubmit={confirmAdd}>
                <FormHelper id="orderQty"
                inputType="number"
                identifier="orderedQuantity"
                labelText ="Qty:"
                newVal={listing.orderedQuantity}
                onChangeHandler={changeHandler}
                min={1}
                max={listing.quantity}
                step={1}
                />
                <button id="listingAddToCartBtn" className="waves-effect waves-light btn-large">Add to Cart</button>
                </form> :
                <form onSubmit={addToCart}>
                <p id="confirmAddToCartMessage">Are you sure you want to add to cart?</p>
                <button id="yesAddToCart"className="waves-effect waves-light btn-small">Yes</button>
                <button type="button" id="noAddToCart" onClick={denyAdd}className="waves-effect waves-light btn-small">No</button>
                </form>
            }
            </> :
            <p>Out of Stock</p>

        }
        </div>
    );
}

export default AddToCartButton;