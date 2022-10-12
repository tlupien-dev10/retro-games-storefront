import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
// import Carousel from "./Webpages/Homepage/Carousel";
import Carousel2 from "../../Components/Carousel2";


import { Link } from "react-router-dom";

function Homepage() {

  const { headingText } = styles;

  return (
    <div>
      <h1 id="homeTxt">Welcome to Retro-Games!</h1>
      <h3 id="topTen">Featured Products!</h3>


      <Carousel2 />

      <Link to={"/listing"}>
        <button className="btn btn-sm btn-success" id="homeBtn">
          Enter to begin shopping
        </button>
      </Link>
    </div>

  );
}
const styles = {
  headingText: {
    fontSize: 50,
    fontWeight: 300
  }

}


export default Homepage;
