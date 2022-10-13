import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FormHelper from "./FormHelper";
import PageErrors from "../PageErrors/PageErrors";
import useAuth from "../Hooks/useAuth";

function AdminAddForm() {
    const [listing, setListing] = useState(null);
    const [error, setError] = useState([]);
    const history = useHistory();
    const auth = useAuth();

    const changeHandler = (event) => {
        const newListing = {...listing};
        newListing[event.target.name] = event.target.value;
        setListing(newListing);
    };

    const submitHandler = (evt) => {
        evt.preventDefault();
        const newListing = {...listing};
    

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
}


    return (
    
       <div className="container">
        {/* <label>Listing Type</label> */}
        <label>
        <input name="Type Group" type="radio" value="Game" checked />
        <span>Game</span>
        </label>
        <p>
        <label>
        <input name="Type Group" type="radio" value="Console" checked />
        <span>Console</span>
        </label>  
        </p>
        <p>
        <label>
        <input name="Type Group" type="radio" value="Merchandise" checked />
        <span>Merchandise</span>
        </label>
        </p>
        
        <form onSubmit={submitHandler}>

           {// SOmething like this: If value===game render 1st Form.  If value===console render 2nd Form.  If value===merchandise render 3rd form
           }
        
                    <PageErrors errors={error} />
       
        </form>
        </div>
    )
}


export default AdminAddForm;