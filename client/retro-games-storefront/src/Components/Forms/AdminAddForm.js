import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FormHelper from "./FormHelper";
import PageErrors from "../PageErrors/PageErrors";
import useAuth from "../Hooks/useAuth";

function AdminAddForm({listing}) {
    const [listing, setListing] = useState([]);
    const [error, setError] = useState([]);
    const history = useHistory();
    const auth = useAuth();

    const changeHandler = (event) => {
        const newListing = {...listing};
        newListing[event.target.name] = event.target.value;
        setListing(newListing);
    };

    // const onChangeValue

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
        <h5>Enter Listing Type</h5>
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

           
           
           <FormHelper
                   inputType={"text"}
                   identifier={"genre"}
                   labelText={"Game Genre:"}
                   newVal={listing.genre}
                   onChangeHandler={changeHandler}
                 />
                  <FormHelper
                   inputType={"text"}
                   identifier={"publisher"}
                   labelText={"Game Publisher"}
                   newVal={listing.publisher}
                   onChangeHandler={changeHandler}
                 />
                  <FormHelper
                   inputType={"date"}
                   identifier={"releaseDate"}
                   labelText={"Release Date:"}
                   newVal={listing.releaseDate}
                   onChangeHandler={changeHandler}
                 />
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
                 <FormHelper
                   inputType={"text"}
                   identifier={"category"}
                   labelText={"Category:"}
                   newVal={listing.version}
                   onChangeHandler={changeHandler}
                 />
           
        
                    <PageErrors errors={error} />
       
        </form>
        </div>
    )
}


export default AdminAddForm;