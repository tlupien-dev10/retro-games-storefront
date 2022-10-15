// import { Link, useHistory } from "react-router-dom";
import {useContext} from "react";
import "./Listing.css";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import CartContext from "../../Components/CartContext/CartContext";


function Listing({listingData, cartListings, setCartListings}) {

  // const cart = useContext(CartContext);

  const addToCart = function(evt) {
    const listing = {...listingData};
    listing.orderedQuantity = 1;
    listing.reviews = [];
    // have a line here that hydrates orderedquantity (default 1)
    const newListings = [...cartListings]
    newListings.push(listing);
    setCartListings(newListings)
  }

  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
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
            <button type="button" onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;


// <img src={listingDetails.imagePath} alt="" />