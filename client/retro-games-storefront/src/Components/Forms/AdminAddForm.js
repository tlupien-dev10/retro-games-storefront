import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FormHelper from "./FormHelper";
import PageErrors from "../PageErrors/PageErrors";
import useAuth from "../Hooks/useAuth";
import AdminAddGame from "./AdminAddGame";
import AdminAddConsole from "./AdminAddConsole";
import AdminAddMerchandise from "./AdminAddMerchandise";

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
  }
};

const listType = [
    {
        label: "GAME",
        value: "GAME",
    },
    {
    label: "CONSOLE",
    value: "CONSOLE",
},
{
label: "MERCHANDISE",
value: "MERCHANDISE",
},
];

function AdminAddForm() {
  const [listing, setListing] = useState(DEFAULT_LISTING);
  const [listingType, setListingType] = useState([]);
  
  const [error, setError] = useState([]);
  const history = useHistory();
  const auth = useAuth();

  const changeHandler = (event) => {
    const newListing = { ...listing };
    newListing[event.target.name] = event.target.value;
    setListing(newListing);
  };

  // const onChangeValue

  const submitHandler = (evt) => {
    evt.preventDefault();
    const newListing = { ...listing };

    // set stuff to null based on type here!

    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user.token}`,
      },
      body: JSON.stringify(newListing),
    };
    fetch("http://localhost:8080/api/listing", init)
      .then(async (response) => {
        if (response.status === 201) {
          return response.json();
        }
        return Promise.reject(await response.json());
      })
      .then((listingInfo) => {
        history.push("/admin/item");
      })
      .catch((err) => setError([...err]));
  };

  function getOtherForm() {
    switch(listing.listingType) {
      case "GAME":
        return <AdminAddGame listing1={listing}/>;
      case "CONSOLE":
        return <AdminAddConsole listing1={listing}/>
      case "MERCHANDISE":
        return <AdminAddMerchandise listing1={listing}/>;
    }
  }

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
{/*const DEFAULT_LISTING = {
  name: "",
  description: "",
  imagePath: "",
  listingType: "",
quantity: "",*/}
      <FormHelper
                   inputType={"date"}
                   identifier={"releaseDate"}
                   labelText={"Release Date:"}
                   newVal={listing.releaseDate}
                   onChangeHandler={changeHandler}
                 />
        <PageErrors errors={error} />
      </form>
    </div>
  );
}

export default AdminAddForm;
