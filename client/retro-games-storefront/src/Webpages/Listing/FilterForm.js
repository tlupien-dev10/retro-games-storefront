import { useState } from "react";
import FormHelper from "../../Components/Forms/FormHelper";
import './FilterForm.css'

const CLEAR_FORM = {
    gameFilter: false,
    consoleFilter: false,
    merchFilter: false,
    minPrice: null,
    maxPrice: null,
    nameSearch: null,
    stockFilter: false,
    sortType: "AtZ"
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

    // add rating to review objects and entire back end, average it, and sort by highest to lowest??
    // maybe other things

    return (
        <div id="filterBarDiv">
    <form onSubmit={(evt) => filter(evt, filterObject)}>
        
        <label id="gameFilter">
            
            <input type="checkbox" className="filled-in checkbox-blue-grey" id="gameFilter" name="gameFilter" checked={filterObject.gameFilter} onChange={changeHandler} />
            <span>Games</span>
        </label>
        <br/>
        <label id="consoleFilter">
            <input type="checkbox" id="consoleFilter" name="consoleFilter" checked={filterObject.consoleFilter} onChange={changeHandler} />
            <span>Consoles</span>
        </label>
        <br/>
        <label id="merchFilter">
            <input type="checkbox" id="merchFilter" name="merchFilter" checked={filterObject.merchFilter} onChange={changeHandler} />
            <span>Merchandise</span>
        </label>
       
        
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
        <FormHelper
            inputType="text"
            identifier="nameSearch"
            labelText="Name"
            newVal={filterObject.nameSearch}
            onChangeHandler={changeHandler}
        />
        <label id="stockFilter">
            <input type="checkbox" id="stockFilter" name="stockFilter" checked={filterObject.stockFilter} onChange={changeHandler} />
            <span>Only show in stock items: </span>
        </label>
        <br/>
        <div id="listingContainer">
          <label htmlFor="SortType">
            Sort by:
          </label>
          <select
            className="browser-default"
            id="sortType"
            name="sortType"
            defaultValue={filterObject.sortType}
            onChange={changeHandler}
          >
            <option value="LtH">Price (Low-High)</option>
            <option value="HtL">Price (High-Low)</option>
            <option value="AtZ">Alphabetical (A-Z)</option>
            <option value="ZtA">Alphabetical (Z-A)</option>
          </select>
          
        </div>
        <button id="applyFilter" className="btn-small waves-effect waves-light">Apply</button>
        

        
 
    </form>
    </div>
        );
}

export default FilterForm;