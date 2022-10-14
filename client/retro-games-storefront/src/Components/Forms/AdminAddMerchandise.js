import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FormHelper from "./FormHelper";
import PageErrors from "../PageErrors/PageErrors";
import useAuth from "../Hooks/useAuth";

function AdminAddMerchandise({listing1}) {
    const [listing, setListing] = useState(listing1);
    const [error, setError] = useState([]);
    const history = useHistory();
    const auth = useAuth();

    const changeHandler = (event) => {
        const newListing = {...listing};
        newListing[event.target.name] = event.target.value;
        setListing(newListing);
    };

    return (
    <p>Add merchandise form would show up.</p>
    );
}

export default AdminAddMerchandise;