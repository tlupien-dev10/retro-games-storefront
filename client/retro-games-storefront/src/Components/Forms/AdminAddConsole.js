import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FormHelper from "./FormHelper";
import PageErrors from "../PageErrors/PageErrors";
import useAuth from "../Hooks/useAuth";

function AdminAddConsole({listing, changeDetails}) {
    const [console, setConsole] = useState(listing.console);
    const [error, setError] = useState([]);
    const history = useHistory();
    const auth = useAuth();

    const changeHandler = (event) => {
        const newConsole = {...console};
        newConsole[event.target.name] = event.target.value;
        setConsole(newConsole);
        changeDetails(newConsole);
    };

    return (
        <div>
            <FormHelper
                inputType={"text"}
                identifier={"version"}
                labelText={"Console Version:"}
                newVal={listing.console.version}
                onChangeHandler={changeHandler}
                />
                <FormHelper
                inputType={"text"}
                identifier={"company"}
                labelText={"Company"}
                newVal={listing.console.company}
                onChangeHandler={changeHandler}
                />
                <FormHelper
                inputType={"date"}
                identifier={"releaseDate"}
                labelText={"Release Date:"}
                newVal={listing.console.releaseDate}
                onChangeHandler={changeHandler}
                />
        </div>
    )
}


export default AdminAddConsole;