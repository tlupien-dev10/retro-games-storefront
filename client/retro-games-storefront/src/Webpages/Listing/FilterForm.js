import { useState } from "react";
import FormHelper from "../../Components/Forms/FormHelper";
import './FilterForm.css'

const CLEAR_FORM = {
    gameFilter: false,
    consoleFilter: false,
    merchFilter: false,
    minPrice: null,
    maxPrice: null
}

function FilterForm({filter}) {

    const [filterObject, setFilterObject] = useState(CLEAR_FORM)

    const changeHandler = function(evt) {
        const newFilterObject = {...filterObject};
        if (evt.target.type === "checkbox") {
            newFilterObject[evt.target.name] = evt.target.checked;
        } else {
            newFilterObject[evt.target.name] = (evt.target.value === "") ? null : evt.target.value;
            
        }
        setFilterObject(newFilterObject);
    }

    // add name search (filter by starts with)
    // add availability filter (hide out of stock)
    // add rating to review objects and entire back end, average it, and sort by highest to lowest??
    // sort by price lowest to highest, etc.
    // sort alphabetical
    // maybe other things

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
        <FormHelper
            inputType="number"
            identifier="minPrice"
            labelText="Minimum Price:"
            newVal={filterObject.minPrice}
            onChangeHandler={changeHandler}
            min="0"
        />
        <FormHelper
            inputType="number"
            identifier="maxPrice"
            labelText="Maximum Price:"
            newVal={filterObject.maxPrice}
            onChangeHandler={changeHandler}
            min="0"
        />
        <button>Apply</button>
    </form>
        );
}

export default FilterForm;