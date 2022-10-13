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
            className="card-img-top"
            src={"../../"+ listing.imagePath}
            alt={listing.description}
          />
        )}
        <figcaption>
          <h4>{listing.description}</h4>
          <p>Name: {listing.name}</p>
          <p>Price: {listing.price}</p>
        </figcaption>
      </figure>
       {listing.reviews.map(r => <p key={r.id}>{r.title}</p>)}
    </div>
    </div>
  );
}

export default ListingId;
