import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
// import Carousel from "./Webpages/Homepage/Carousel";
import Carousel from "../../Components/./Carousel/Carousel";
import "./Homepage.css";

import { Link } from "react-router-dom";

function Homepage() {

  const { headingText } = styles;

  return (
    <div id="test">
      <h2 id="homeTxt">Welcome to Retro-Games!</h2>
      <h3 id="topTen">Featured Products!</h3>
    
      <Carousel />
      <div id="homeShopDiv">
      <Link to={"/listing"}>
        <button className="btn btn-sm btn-success" id="homeShopBtn">
          Enter to begin shopping<i class="material-icons" id="cartLogo">shopping_cart</i></button>
      </Link>
      <div className="video-container responsive-video" controls>
        <iframe src="https://www.youtube.com/embed/ULMOcdlHH1s"></iframe>
      </div>
      </div>
      
      {/* <div class="video-container">
        <iframe  src="https://www.youtube.com/embed/ULMOcdlHH1s" frameBorder="0" allowFullScreen></iframe>
      </div> */}
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
