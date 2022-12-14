import { useEffect, useState } from "react";
import FormHelper from "./FormHelper";
import "./AdminAddGame.css";

function AdminAddGame({listing, changeDetails, setError}) {
    const [game, setGame] = useState(listing.game);
    const [consoles, setConsoles] = useState([]);

    const changeHandler = (evt) => {
        // 
        const newGame = {...game};
        if (evt.target.name==="consoles") {
            let options = evt.target.options;
            newGame.consoles = [];
            for (let i = 0; i < options.length; i++) {
              if (options[i].selected) {
                
                newGame.consoles.push(consoles.find(c => c.console.id === parseInt(options[i].value)).console);
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
    
    function fillSelect() {
        if (!game.id) {
            return;
        }

        const options = [...document.getElementById("consoles").options];
        
        // 

        if (options.length >= 1) {
            for (let i = 0; i < game.consoles.length; i++) {
                
                options.find(o => parseInt(o.value) === game.consoles[i].id).selected = true;
                // 
            }
        }
    }

    useEffect(() => {
        return getConsoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        return fillSelect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [consoles]);

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
                    onChange={changeHandler}
                    defaultValue={listing.game.consoles.find(({value})=> value===listing.game.consoles.id)}
                >
                    {consoles.map(c => <option key={c.console.id} value={c.console.id}>{c.name}</option>)}
                  
                </select>
            </div>
        </div>
    );

}

export default AdminAddGame;