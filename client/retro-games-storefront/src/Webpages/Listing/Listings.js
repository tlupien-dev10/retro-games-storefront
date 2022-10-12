import { useState, useEffect } from "react";
import Listing from "./Listing";
import "./Listings.css";


function Listings() {
    const [allListings, setAllListings] = useState([]);

    function getAllListings() {
        fetch("http://localhost:8080/api/listing")
        .then(async (response) => {
            if(response.status === 200) {
                return response.json();
            } else {
                Promise.reject(await response.json());
            }
        })
        .then((itemList) => {
            setAllListings(itemList);
        });
    }

    useEffect(() => {
        // fetch("http://localhost:8080/api/listing")
        // .then((response) => response.json())
        // .then((listingData) => setAllListings(listingData));
        getAllListings();
    }, []);

    return (
        <div id="allListings">
            {allListings.map((listing) => (
                <Listing key={listing.id} listingDetails={listing} />
            ))}
        </div>
    );
}

export default Listings;