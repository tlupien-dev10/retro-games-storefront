import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Listings.css";
import Listing from "./Listing";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";
import Buttons from "./FilterButton";
function Listings({cartListings, setCartListings}) {
  const [allListings, setAllListings] = useState([]);
  const [error, setError] = useState([]);
 // const type=[...new Set(data.map((listings) => listings.listingType))];

  const auth = useAuth();
  const history = useHistory();

  function getAllListings() {
    fetch("http://localhost:8080/api/listing")
      .then((response) => response.json())
      .then((data) => setAllListings(data))
      .catch((errList) => {
        if (errList instanceof TypeError){
          setError(["Could not connect to api"])
        } else {
        setError([...errList])}});
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
      {allListings.map((listing) => (
        <Listing key={listing.id} listingData={listing} cartListings={cartListings} setCartListings={setCartListings} />
      ))}
    </div>
  );
}

export default Listings;
