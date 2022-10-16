import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FormHelper from "./FormHelper";
import PageErrors from "../PageErrors/PageErrors";
import useAuth from "../Hooks/useAuth";
import AdminAddGame from "./AdminAddGame";
import AdminAddConsole from "./AdminAddConsole";
import AdminAddMerchandise from "./AdminAddMerchandise";
import "./AdminAddForm.css";

const DEFAULT_LISTING = {
  name: "",
  description: "",
  imagePath: "",
  listingType: "GAME",
  quantity: "",
  price: "",
  console: {
    version: "",
    company: "",
    releaseDate: "1970-01-01"
  },
  game: {
    genre: "",
    publisher: "",
    releaseDate: "1970-01-01",
    consoles: []
  },
  merchandise: {
    category: ""
  }
};

function AdminAddForm() {
  const {editId} = useParams();
  console.log(editId);
  
  const [listing, setListing] = useState(DEFAULT_LISTING);
  // MAKE THIS FETCH BY ID IF IT'S THE ADD FORM!
  const [error, setError] = useState([]);
  const history = useHistory();
  const auth = useAuth();

  const getToEdit = function() {
    if (editId) {
      fetch(`http://localhost:8080/api/listing/${editId}`)
        .then(res => res.json())
        .then(data => setListing(data))
    }
  }

  useEffect(() => getToEdit(), [])

  const changeHandler = (event) => {
    const newListing = { ...listing };
    newListing[event.target.name] = event.target.value;
    setListing(newListing);
  };

  const changeDetails = function(details) {
    const newListing = {...listing};
    switch(listing.listingType) {
      case "GAME":
        newListing.game = details;
        break;
      case "CONSOLE":
        newListing.console = details;
        break;
      case "MERCHANDISE":
        newListing.merchandise = details;
       break;
    }
    setListing(newListing);
  }


  const submitHandler = (evt) => {
    evt.preventDefault();
    const newListing = { ...listing };

    // set stuff to null based on type here!
    switch(listing.listingType) {
      case "GAME":
        newListing.console = null;
        newListing.merchandise = null;
        break;
      case "CONSOLE":
        newListing.game = null;
        newListing.merchandise = null;
        break;
      case "MERCHANDISE":
       newListing.game = null;
       newListing.console = null;
       break;
    }

    console.log(newListing);

    const init = {
      method: editId ? "PUT": "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user.token}`,
      },
      body: JSON.stringify(newListing),
    };
    fetch(`http://localhost:8080/api/listing${editId ? editId :""}`, init)
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        return Promise.reject("error");
      })
      .then((res) => {
        history.push("/admin/item");
      })
      .catch((err) => setError([...err]));
  };

  function getOtherForm() {
    switch(listing.listingType) {
      case "GAME":
        return <AdminAddGame listing={listing} changeDetails={changeDetails}/>;
      case "CONSOLE":
        return <AdminAddConsole listing={listing} changeDetails={changeDetails}/>
      case "MERCHANDISE":
        return <AdminAddMerchandise listing={listing} changeDetails={changeDetails}/>;
    }
  }

  return (
    <div className="container" id="formHelperContainer">
      <form onSubmit={submitHandler}>
        <FormHelper
          inputType="text"
          identifier="name"
          labelText="Name:"
          newVal={listing.name}
          onChangeHandler={changeHandler}
        />
          <div id="descriptionDiv">
        <FormHelper
          inputType="textarea"
          identifier="description"
          labelText="Description:"
          newVal={listing.description}
          onChangeHandler={changeHandler}
        />
        </div>
        <FormHelper
          inputType="text"
          identifier="imagePath"
          labelText="Image Path:"
          newVal={listing.imagePath}
          onChangeHandler={changeHandler}
        />

        <FormHelper
          inputType="number"
          identifier="quantity"
          labelText="Quantity Available:"
          newVal={listing.quantity}
          onChangeHandler={changeHandler}
          min="0"
          step="1"
        />
        
        <FormHelper
          inputType="number"
          identifier="price"
          labelText="Price:"
          newVal={listing.price}
          onChangeHandler={changeHandler}
        />

        <div id="listingContainer">
          <label id="listing" htmlFor="listingType">
            Listing Type:
          </label>
          <select
            className="browser-default"
            id="listingType"
            name="listingType"
            defaultValue={listing.listingType}
            onChange={changeHandler}
          >
            <option value="GAME">GAME</option>
            <option value="CONSOLE">CONSOLE</option>
            <option value="MERCHANDISE">MERCHANDISE</option>
          </select>
        </div>

        {
          getOtherForm()
        }

        <button type="submit" className="btn btn-success">
          Add Listing
        </button>

        <PageErrors errors={error} />
      </form>
    </div>
  );
}

export default AdminAddForm;
