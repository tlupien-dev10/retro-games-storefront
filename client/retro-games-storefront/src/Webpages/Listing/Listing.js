// import { Link, useHistory } from "react-router-dom";
import {useContext, useState} from "react";
import "./Listing.css";
import { Link, useHistory} from "react-router-dom";
import FormHelper from "../../Components/Forms/FormHelper";
import useAuth from "../../Components/Hooks/useAuth";
import AddToCartButton from "./AddToCartButton";


function Listing({listingData, cartListings, setCartListings}) {

  const auth = useAuth();
  const history = useHistory();

  const [listing, setListing] = useState(listingData);

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
            <AddToCartButton listing={listing} setListing={setListing} cartListings={cartListings} setCartListings={setCartListings} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;


// <img src={listingDetails.imagePath} alt="" />