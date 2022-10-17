import { useState } from "react";
import './FilterForm.css'

const CLEAR_FORM = {
    gameCheckbox: false
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
            <input type="checkbox" id="gameCheckbox" name="gameCheckbox" checked={filterObject.gameCheckbox} onChange={changeHandler} />
            <span id="gameCheckboxLabel">Game</span>
        </label>
        </fieldset>
        <button>Apply</button>
    </form>
        );
}

export default FilterForm;