import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Listings.css";
import Listing from "./Listing";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";
import FilterForm from "./FilterForm";
function Listings({cartListings, setCartListings}) {
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [error, setError] = useState([]);
 // const type=[...new Set(data.map((listings) => listings.listingType))];

  const auth = useAuth();
  const history = useHistory();

  function getAllListings() {
    fetch("http://localhost:8080/api/listing")
      .then((response) => response.json())
      .then((data) => {
        setAllListings(data);
        setFilteredListings(data);
      })
      .catch((errList) => {
        if (errList instanceof TypeError){
          setError(["Could not connect to Server"])
        } else {
        setError([...errList])}});
  }

  useEffect(() => getAllListings(), []);

  const filter = function(evt, filterObject) {
    evt.preventDefault();
    // expect an object with a bunch of booleans and ranges
    // apply this object to allListings via maps?
    console.log(filterObject);
    let newFilteredListings = [...allListings]
    let categoryFilter = [];
    if (filterObject.gameFilter) {
      categoryFilter.push("GAME")
    }
    if (filterObject.consoleFilter) {
      categoryFilter.push("CONSOLE")
    }
    if (filterObject.merchFilter) {
      categoryFilter.push("MERCHANDISE")
    }
    newFilteredListings = categoryFilter.length > 0 ?
      newFilteredListings.filter(l => categoryFilter.includes(l.listingType)) :
      newFilteredListings;

    newFilteredListings = newFilteredListings.filter( l => { return (
      (filterObject.minPrice === null || l.price >= filterObject.minPrice) 
      && (filterObject.maxPrice === null || l.price <= filterObject.maxPrice)
    )})

    if (filterObject.nameSearch) {
      newFilteredListings = newFilteredListings.filter(l => l.name.startsWith(filterObject.nameSearch))
    }

    if (filterObject.stockFilter) {
      newFilteredListings = newFilteredListings.filter(l => l.quantity > 0);
    }

    setFilteredListings(newFilteredListings);
  }

  return (
    <>
      <div id="filterCheckbox"> {
      // this div should have a css property that makes it always to the left of the other div
      }
        <FilterForm filter={filter}/>
      </div>
      <div>
        {/* <h4 className="col-12 text-center my-3 fw-bold">Filter</h4>
        <Buttons  filterallListings={filterallListings}
              setallListings={setallListings}
              type={type}
            /> */}
        <PageErrors errors={error} />
        {filteredListings.map((listing) => (
          <Listing key={listing.id} listingData={listing} cartListings={cartListings} setCartListings={setCartListings} />
        ))}
      </div>
    </>
  );
}

export default Listings;
