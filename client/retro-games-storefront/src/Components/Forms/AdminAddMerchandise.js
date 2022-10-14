import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FormHelper from "./FormHelper";
import PageErrors from "../PageErrors/PageErrors";
import useAuth from "../Hooks/useAuth";

function AdminAddMerchandise({listing, changeDetails}) {
    const [merch, setMerch] = useState(listing.merchandise);
    const [error, setError] = useState([]);
    const history = useHistory();
    const auth = useAuth();

    const changeHandler = (event) => {
        const newMerch = {...merch};
        newMerch[event.target.name] = event.target.value;
        setMerch(newMerch);
        changeDetails(merch);
    };

    return (
        <div>
        <FormHelper
            inputType={"text"}
            identifier={"category"}
            labelText={"Merchandise Category:"}
            newVal={listing.merchandise.category}
            onChangeHandler={changeHandler}
            />
        </div>
    );
}

export default AdminAddMerchandise;