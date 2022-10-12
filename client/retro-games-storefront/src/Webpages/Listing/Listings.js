import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./Listings.css";
import Listing from "../Listing/Listing";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";


function Listings() {
    const [listings, setListings]=useState([]);
    const [error, setError] = useState([]);

    const auth = useAuth();
    const history = useHistory();

    function getAllListings() {
        fetch('http://localhost:8080/api/listing')
            .then((response) => response.json())
            .then((data) => setListings(data))
            .catch((err) => setError([...err]));

    }

    useEffect(() => getAllListings(), []);



    return (
        <div>
            <PageErrors errors={error} />
         {listings.map((listing) => (
        <Listing key={listing.id} listing={listing} />
    ))}
    </div>);
}

export default Listings;