import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FormHelper from "./FormHelper";
import PageErrors from "../PageErrors/PageErrors";
import useAuth from "../Hooks/useAuth";

const DEFAULT_LISTING = {
  name: "",
  description: "",
  imagePath: "",
  listingType: "",
  quantity: "",
  price: "",
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
                   inputType={"text"}
                   identifier={"name"}
                   labelText={"Listing Name:"}
                   newVal={listing.name}
                   onChangeHandler={changeHandler}
                 />
                    <FormHelper
                   inputType={"text"}
                   identifier={"description"}
                   labelText={"Description:"}
                   newVal={listing.description}
                   onChangeHandler={changeHandler}
                 />
                    <FormHelper
                   inputType={"text"}
                   identifier={"imagePath"}
                   labelText={"Image Path:"}
                   newVal={listing.imagePath}
                   onChangeHandler={changeHandler}
                 />
               <select>
                <option value="0">--Choose--</option>
                 {listType.map((t) => (
                    <option key={t.id} value={t.value}>{t.label}</option>
                 ))}
                </select>
                    <FormHelper
                   inputType={"number"}
                   identifier={"quantity"}
                   labelText={"Quantity:"}
                   newVal={listing.quantity}
                   onChangeHandler={changeHandler}
                 />
                    <FormHelper
                   inputType={"number"}
                   identifier={"price"}
                   labelText={"Listing Price:"}
                   newVal={listing.price}
                   onChangeHandler={changeHandler}
                 />
        <PageErrors errors={error} />
      </form>
    </div>
  );
}

export default AdminAddForm;
