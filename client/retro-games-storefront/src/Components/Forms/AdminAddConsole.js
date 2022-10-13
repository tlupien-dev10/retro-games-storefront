import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FormHelper from "./FormHelper";
import PageErrors from "../PageErrors/PageErrors";

function AdminAddConsole() {
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
    fetch ("http://localhost:8080/api/listing", init)
    .then (async response => {
        if (response.status === 201) {
            return response.json();
        }
        return Promise.reject (await response.json());
    })
    .then (listingInfo => {
        history.push ("/admin/item")
    })
    .catch ((err) => setError([...err]));


    return (
        <div className="container">
            <form onSubmit={submitHandler}>
                <h2 id="addConsoleTitle">Add New Console</h2>
                <FormHelper
                   inputType={"text"}
                   identifier={"version"}
                   labelText={"Console Version:"}
                   newVal={listing.version}
                   onChangeHandler={changeHandler}
                 />
                  <FormHelper
                   inputType={"text"}
                   identifier={"company"}
                   labelText={"Company"}
                   newVal={listing.company}
                   onChangeHandler={changeHandler}
                 />
                  <FormHelper
                   inputType={"date"}
                   identifier={"releaseDate"}
                   labelText={"Release Date:"}
                   newVal={listing.releaseDate}
                   onChangeHandler={changeHandler}
                 />
            </form>
            <PageErrors errors={error} />
        </div>
    )
}


export default AdminAddConsole;