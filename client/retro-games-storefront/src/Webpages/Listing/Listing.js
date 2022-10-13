// import { Link, useHistory } from "react-router-dom";
import "./Listing.css";
import { Link } from "react-router-dom";


function Listing({allListing}) {


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
            <a href={"listing/" + allListing.id}>Add to Cart Placeholder</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;


// <img src={listingDetails.imagePath} alt="" />