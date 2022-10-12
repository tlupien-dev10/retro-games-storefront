import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./ListingId.css";
import Listing from "../Listing/Listing";
import useAuth from "../../Components/Hooks/useAuth";


function ListingId() {
    const [listings, setListings]=useState([]);

    const auth = useAuth();
    const history = useHistory();

    useEffect(() => {
        fetch("http://localhost:8080/api/listing")
        .then((response) => response.json())
        .then((data) => setListings(data));
    }, []);



    return (
        <div>
         {listings.map((listing) => (
        <Listing key={listing.id} listing={listing} />
    ))}
    </div>);
}

export default ListingId;