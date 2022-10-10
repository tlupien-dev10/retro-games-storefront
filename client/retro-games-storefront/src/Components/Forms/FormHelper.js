function FormHelper({
    labelText,
    identifier,
    inputType,
    newVal,
    onChangeHandler,
  }) {
    return (
      <div id="field">
        <label className="form-label" htmlFor={identifier}>
          {labelText}
        </label>
        <input
          className="form-control"
          type={inputType}
          id={identifier}
          name={identifier}
          defaultValue={newVal}
          onChange={onChangeHandler}
        />
      </div>
    );
  }
  
  export default FormHelper;