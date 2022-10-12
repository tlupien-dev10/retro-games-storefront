import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./Listings.css";
import Listing from "../Listing/Listing";
import useAuth from "../../Components/Hooks/useAuth";


function Listings() {
    const [listings, setListings]=useState([]);

    const auth = useAuth();
    const history = useHistory();

    function getAllListings() {
        fetch('http://localhost:8080/api/listing')
            .then((response) => response.json())
            .then((data) => setListings(data));
    }

    useEffect(() => getAllListings(), []);



    return (
        <div>
         {listings.map((listing) => (
        <Listing key={listing.id} listing={listing} />
    ))}
    </div>);
}

export default Listings;