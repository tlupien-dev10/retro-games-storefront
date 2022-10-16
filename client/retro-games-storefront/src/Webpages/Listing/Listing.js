// import { Link, useHistory } from "react-router-dom";
import {useContext, useState} from "react";
import "./Listing.css";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import CartContext from "../../Components/CartContext/CartContext";
import FormHelper from "../../Components/Forms/FormHelper";


function Listing({listingData, cartListings, setCartListings}) {

  // const cart = useContext(CartContext);

  const [listing, setListing] = useState(listingData);

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
  }

  const changeHandler = function(evt) {
    const newListing = { ...listing };
    newListing[evt.target.name] = evt.target.value;
    setListing(newListing);
  }

  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card" id="listingCard">
          <div className="card-image">
            <Link to={"listing/" + listingData.id}>
           <img src={"../../"+ listingData.imagePath} alt="" />
           </Link>
          </div>
     
          <div className="card-content">
            <p>Name: {listingData.name}</p>
            <p>Price: {listingData.price}</p>
            <p>Type: {listingData.listingType}</p>
          </div>
          <div className="card-action">
            {/* <a href={"listing/" + listing.id}>Additional Information</a> */}
            <form onSubmit={addToCart}>
            <FormHelper id="orderQty"
              inputType="number"
              identifier="orderedQuantity"
              labelText ="Qty:"
              newVal={listing.orderedQuantity}
              onChangeHandler={changeHandler}
              min={0}
              max={listing.quantity}
              step={1}
            />
              <button id="listingAddToCartBtn" className="waves-effect waves-light btn-large">Add to Cart</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;


// <img src={listingDetails.imagePath} alt="" />