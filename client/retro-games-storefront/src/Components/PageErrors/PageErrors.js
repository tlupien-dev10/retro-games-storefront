import "./PageErrors.css";

function PageErrors({ errors }) {
  return (
    <ul id="errorList">
      {errors.map((e) => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  );
}

export default PageErrors;