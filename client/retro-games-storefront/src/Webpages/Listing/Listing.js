// import { Link, useHistory } from "react-router-dom";
import "./Listing.css";
import one from "../../ImageTest/1.jpg";
import PageErrors from "../../Components/PageErrors/PageErrors";

function Listing({listing}) {


  return (
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
          <div className="card-image">
           <img src={"../../"+ listing.imagePath} alt="" />
          </div>
          {/* <div className="card-image">
           <img src={one} alt="1" />
          </div> */}
          <div className="card-content">
            <p>Name: {listing.name}</p>
            <p>Price: {listing.price}</p>
          </div>
          <div className="card-action">
            <a href={"listing/" + listing.id}>Additional Information</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listing;


// <img src={listingDetails.imagePath} alt="" />