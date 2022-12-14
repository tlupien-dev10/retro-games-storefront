import React, { Component } from "react";
import {Link} from "react-router-dom";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "./Carousel.css";

class Carousel extends Component {
  componentDidMount() {
    const options = {
      duration: 300,
      onCycleTo: () => {
        
      },
    };
    M.Carousel.init(this.Carousel, options);
  }
        //Eventually want navigation arrows
          //However, even with out them it will still allow you to
          //Cycle through the Carousel to view all items as long as you
          //Don't click on the current Pop-upped Image
  render() {
    return (
      <div
        ref={(Carousel) => {
          this.Carousel = Carousel;
        }}
        className="carousel"
      >
        <div className="carousel-item">
          <Link to={"/listing/1"}>
          <img id="c1" alt="1" src={"/ImageTest/1.jpg"} />
          </Link>
        </div>
        <div className="carousel-item">
        <Link to={"/listing/2"}>
          <img id="c2" alt="2" src={"/ImageTest/2.jpg"} />
          </Link>
        </div>
        <div className="carousel-item">
        <Link to={"/listing/3"}>
          <img id="c3" alt="3" src={"/ImageTest/3.jpg"} />
          </Link>
        </div>
        <div className="carousel-item">
        <Link to={"/listing/4"}>
          <img id="c4" alt="4" src={"/ImageTest/4.jpg"} />
          </Link>
        </div>
        <div className="carousel-item">
        <Link to={"/listing/5"}>
          <img id="c5" alt="5" src={"/ImageTest/5.jpg"} />
        </Link>
        </div>
      </div>
    );
  }
}

export default Carousel;
