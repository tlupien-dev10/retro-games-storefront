// import { Link, useHistory } from "react-router-dom";
import "./Listing.css";
import one from "../../ImageTest/1.jpg";

function Listing(listingDetails) {
  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
          <div className="card-image">
          <img alt="1" src={one} />
          </div>
          <div className="card-content">
            <p>Name: {listingDetails.name}</p>
            <p>Price: {listingDetails.price}</p>
          </div>
          <div className="card-action">
            <a href={"listing/" + listingDetails.id}>This is a link</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;


// <img src={listingDetails.imagePath} alt="" />