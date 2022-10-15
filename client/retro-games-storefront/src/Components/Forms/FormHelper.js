function FormHelper({
    labelText,
    identifier,
    inputType,
    newVal,
    onChangeHandler,
    min,
    max,
    step
  }) {
    return (
      <div id="field" key={identifier}>
        <label className="form-label left" htmlFor={identifier}>
          {labelText}
        </label>
        <input
          className="form-control"
          type={inputType}
          id={identifier}
          name={identifier}
          defaultValue={newVal}
          onChange={onChangeHandler}
          min={min}
          max={max}
          step={step}
        />
      </div>
    );
  }
  
  export default FormHelper;