import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import FormHelper from "./FormHelper";
import PageErrors from "../PageErrors/PageErrors";
import useAuth from "../Hooks/useAuth";
import "./AdminAddGame.css";

function AdminAddGame({listing, changeDetails}) {
    const [game, setGame] = useState(listing.game);
    const [error, setError] = useState([]);
    const [consoles, setConsoles] = useState([]);
    const history = useHistory();
    const auth = useAuth();

    const changeHandler = (evt) => {
        const newGame = {...game};
        if (evt.target.name==="consoles") {
            let options = evt.target.options;
            newGame.consoles = [];
            for (let i = 0; i < options.length; i++) {
              if (options[i].selected) {
                console.log(consoles);
                newGame.consoles.push(consoles.find(c => c.console.id == options[i].value).console);
              }
            }
        } else {
            newGame[evt.target.name] = evt.target.value;
        }
        setGame(newGame);
        changeDetails(newGame);
    };

    function getConsoles() {
        fetch("http://localhost:8080/api/listing")
          .then((response) => response.json())
          .then((data) => {
            setConsoles(data.filter(l => l.console));
          })
          .catch((err) => setError([...err]));
      }

    useEffect(() => getConsoles(), []);

    return (
        <div id="gameDiv">
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
                labelText={"Publisher:"}
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
            <div id="adminAddForm">                
                {
                    //STYLE ME!
                }
                <label htmlFor="consoles" id="consoleSelectTitle">
                    Consoles:
                </label>
                <select

                    multiple={true}
                    className="browser-default"
                    id="consoles"
                    name="consoles"
                    // defaultValue={listing.game.consoles}
                    onChange={changeHandler}
                    defaultValue={listing.game.consoles.find(({value})=> value===listing.name)}
                >
                    {consoles.map(c => <option key={c.console.id} value={c.console.id}>{c.name}</option>)}
                  
                </select>
            </div>
        </div>
    );

}

export default AdminAddGame;