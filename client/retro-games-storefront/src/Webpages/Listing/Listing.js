// import { Link, useHistory } from "react-router-dom";
import {useContext} from "react";
import "./Listing.css";
import { Link } from "react-router-dom";
import Cart from "../Cart/Cart";
import CartContext from "../../Components/CartContext/CartContext";


function Listing({allListing}) {

  const cart = useContext(CartContext);

  const addToCart = function(evt) {
    const listing = "Test" // DELETE THIS (EVENTUALLY)
    const newListings = [...cart.listings]
    newListings.push(listing);
    cart.listings = newListings;
    console.log(cart.listings);
  }

  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
          <div className="card-image">
            <Link to={"listing/" + allListing.id}>
           <img src={"../../"+ allListing.imagePath} alt="" />
           </Link>
          </div>
     
          <div className="card-content">
            <p>Name: {allListing.name}</p>
            <p>Price: {allListing.price}</p>
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