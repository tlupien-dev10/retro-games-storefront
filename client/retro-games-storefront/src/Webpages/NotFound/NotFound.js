import {useHistory} from "react-router-dom";

function NotFound() {
  const history = useHistory();

  return (
    <main>
      <h1 id="notFound">We're sorry, the requested page was not found.</h1>
      <p id="notFoundpar">
        Press the button below to return to the previous page
      </p>
      <button id="returnButton" onClick={() => history.goBack()}>
        Return
      </button>
    </main>
  );
}

export default NotFound;
