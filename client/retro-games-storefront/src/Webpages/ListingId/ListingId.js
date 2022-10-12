import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./ListingId.css";
import ListingIdDisplay from "./ListingIdDisplay";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";

function ListingId() {
  const [listing, setListing] = useState([]);
  const [error, setError] = useState([]);
  const {id} = useParams();

  const auth = useAuth();
  const history = useHistory();

  function getListing() {
    fetch(`http://localhost:8080/api/listing/${id}`)
        .then((response) => response.json())
        .then((data) => setListing(data))
        .catch((err) => setError([...err]));

}

useEffect(() => getListing(), []);

  return (
    <div>
      <PageErrors errors={error} />
      {listing.map((listing) => (
        <ListingIdDisplay key={listing.listingId} listing={listing} />
      ))}
    </div>
  );
}

export default ListingId;
