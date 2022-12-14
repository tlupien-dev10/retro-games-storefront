import { useEffect, useState } from "react";

import "./Listings.css";
import Listing from "./Listing";
import PageErrors from "../../Components/PageErrors/PageErrors";
import FilterForm from "./FilterForm";
function Listings({cartListings, setCartListings}) {
  const [allListings, setAllListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [error, setError] = useState([]);

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
      newFilteredListings = newFilteredListings.filter(l => l.name.toLowerCase().startsWith(filterObject.nameSearch.toLowerCase()))
    }

    if (filterObject.stockFilter) {
      newFilteredListings = newFilteredListings.filter(l => l.quantity > 0);
    }

    switch (filterObject.sortType) {
      case "AtZ":
        newFilteredListings.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "ZtA":
        newFilteredListings.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "LtH":
        newFilteredListings.sort((a, b) => a.price - b.price);
        break;
      case "HtL":
        newFilteredListings.sort((a, b) => b.price - a.price);
        break;
      default:
        console.log("Not sorted");
    }

    setFilteredListings(newFilteredListings);
  }

  return (
    <>
      <div id="filterForm"> 
        <FilterForm filter={filter}/>
      </div>
      <div id="listingArea">
        <PageErrors errors={error} />
        {filteredListings.map((listing) => (
          <Listing key={listing.id} listingData={listing} cartListings={cartListings} setCartListings={setCartListings} />
        ))}
      </div>
    </>
  );
}

export default Listings;
