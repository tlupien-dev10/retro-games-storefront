import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FormHelper from "./FormHelper";
import PageErrors from "../PageErrors/PageErrors";
import useAuth from "../Hooks/useAuth";

function AdminAddGame({listing, changeDetails}) {
    const [game, setGame] = useState(listing.game);
    const [error, setError] = useState([]);
    const history = useHistory();
    const auth = useAuth();

    const changeHandler = (event) => {
        const newGame = {...game};
        newGame[event.target.name] = event.target.value;
        setGame(newGame);
        changeDetails(game);
    };

    return (
        <div>
        <FormHelper
            inputType={"text"}
            identifier={"genre"}
            labelText={"Genre:"}
            newVal={listing.game.genre}
            onChangeHandler={changeHandler}
            />
            <FormHelper
            inputType={"text"}
            identifier={"publisher"}
            labelText={"publisher"}
            newVal={listing.game.publisher}
            onChangeHandler={changeHandler}
            />
            <FormHelper
            inputType={"date"}
            identifier={"releaseDate"}
            labelText={"Release Date:"}
            newVal={listing.game.releaseDate}
            onChangeHandler={changeHandler}
            />
        </div>
    );

}

export default AdminAddGame;