import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Listings.css";
import Listing from "./Listing";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";


function Listings() {
    const [allListings, setallListings]=useState([]);
    const [error, setError] = useState([]);

    const auth = useAuth();
    const history = useHistory();

    function getAllListings() {
        fetch('http://localhost:8080/api/listing')
            .then((response) => response.json())
            .then((data) => setallListings(data))
            .catch((err) => setError([...err]));

    }

    useEffect(() => getAllListings(), []);



    return (
        <div>
            <PageErrors errors={error} />
         {allListings.map((listing) => (
        <Listing key={listing.id} listing={listing} />
    ))}
    </div>);
}

export default Listings;