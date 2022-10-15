import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./ListingId.css";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";

function ListingId() {
  const [listing, setListing] = useState({reviews:[]});
  const [error, setError] = useState([]);
  const {id} = useParams();

  const auth = useAuth();
  const history = useHistory();

  function getListing() {
    fetch("http://localhost:8080/api/listing/" + id)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          // console.log(data.reviews);
          return setListing(data);
        })
        .catch((err) => setError([...err]));

}

useEffect(() => getListing(), []);

  return (
    <div>
      <PageErrors errors={error} />
      <div>
      <figure>
        {"../../"+ listing.imagePath && (
          <img
            className="card-img-top" id="listingIdImg"
            src={"../../"+ listing.imagePath}
            alt={""}
          />
        )}
        <figcaption id="listingIdText">
          <h4>{listing.name}</h4>
          <p>Description: {listing.description}</p>
          <p id="listingIdPrice">Price: ${listing.price}</p>
        </figcaption>
      </figure>
      <div id="reviews">
        <h5>Reviews</h5>
       {listing.reviews.map(r => <p key={r.id}>{r.title}</p>)}
       </div>
    </div>
    </div>
  );
}

export default ListingId;
