// import { Link, useHistory } from "react-router-dom";
import "./Listing.css";
import { Link } from "react-router-dom";


function Listing({listing}) {


  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
          <div className="card-image">
            <Link to={"listing/" + listing.id}>
           <img src={"../../"+ listing.imagePath} alt="" />
           </Link>
          </div>
     
          <div className="card-content">
            <p>Name: {listing.name}</p>
            <p>Price: {listing.price}</p>
          </div>
          <div className="card-action">
            {/* <a href={"listing/" + listing.id}>Additional Information</a> */}
            <a href={"listing/" + listing.id}>Add to Cart Placeholder</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;


// <img src={listingDetails.imagePath} alt="" />