import { Link } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  return (
    <div>
      <h1 id="homeTxt">Welcome to Retro-Games!</h1>

      <Link to={"/agent"}>
        <button className="float-start btn btn-sm btn-success" id="homeBtn">
          Enter if you have what it takes
        </button>
      </Link>
    </div>
  );
}

export default Homepage;
