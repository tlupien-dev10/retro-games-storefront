import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FormHelper from "./FormHelper";
import PageErrors from "../PageErrors/PageErrors";

function AdminAddMerchandise() {
    const [listing, setListing] = useState(null);
    const [error, setError] = useState([]);
    const history = useHistory();

    const changeHandler = (event) => {
        const newListing = {...listing};
        newListing[event.target.name] = event.target.value;
        setListing(newListing);
    };

    const submitHandler = (evt) => {
        evt.preventDefault();
        const newListing = {...listing};
    }

    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user.token}`,
        },
        body: JSON.stringify(newListing)
    };
}

export default AdminAddMerchandise;