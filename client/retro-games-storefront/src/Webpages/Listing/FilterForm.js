import { useState } from "react";
import './FilterForm.css'

const CLEAR_FORM = {
    gameFilter: false,
    consoleFilter: false,
    merchFilter: false
}

function FilterForm({filter}) {

    const [filterObject, setFilterObject] = useState(CLEAR_FORM)

    const changeHandler = function(evt) {
        const newFilterObject = {...filterObject};
        if (evt.target.type === "checkbox") {
            newFilterObject[evt.target.name] = evt.target.checked;
        }
        setFilterObject(newFilterObject);
    }

    return (
    <form onSubmit={(evt) => filter(evt, filterObject)}>
        <fieldset id="checks">
        <label>
            <input type="checkbox" id="gameFilter" name="gameFilter" checked={filterObject.gameFilter} onChange={changeHandler} />
            <span>Games</span>
        </label>
        <br/>
        <label>
            <input type="checkbox" id="consoleFilter" name="consoleFilter" checked={filterObject.consoleFilter} onChange={changeHandler} />
            <span>Consoles</span>
        </label>
        <br/>
        <label>
            <input type="checkbox" id="merchFilter" name="merchFilter" checked={filterObject.merchFilter} onChange={changeHandler} />
            <span>Merchandise</span>
        </label>
        </fieldset>
        <button>Apply</button>
    </form>
        );
}

export default FilterForm;