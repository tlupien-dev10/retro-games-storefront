import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Listings.css";
import Listing from "./Listing";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";
import Buttons from "./FilterButton";
function Listings() {
  const [allListings, setallListings] = useState([]);
  const [error, setError] = useState([]);
 // const type=[...new Set(data.map((listings) => listings.listingType))];

  const auth = useAuth();
  const history = useHistory();

  function getAllListings() {
    fetch("http://localhost:8080/api/listing")
      .then((response) => response.json())
      .then((data) => setallListings(data))
      .catch((err) => setError([...err]));
  }

  useEffect(() => getAllListings(), []);

  return (
    <div>
      {/* <h4 className="col-12 text-center my-3 fw-bold">Filter</h4>
      <Buttons  filterallListings={filterallListings}
            setallListings={setallListings}
            type={type}
          /> */}
      <PageErrors errors={error} />
      {allListings.map((listings) => (
        <Listing key={listings.id} allListing={listings} />
      ))}
    </div>
  );
}

export default Listings;
