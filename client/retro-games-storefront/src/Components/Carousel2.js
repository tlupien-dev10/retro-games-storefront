import React, { Component } from "react";
import {Link} from "react-router-dom";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "./Carousel.css";

class Carousel2 extends Component {
  componentDidMount() {
    const options = {
      duration: 300,
      onCycleTo: () => {
        console.log("New Slide");
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
          <Link to={"/listing"}>
          <img alt="1" src={"/ImageTest/1.jpg"} />
          </Link>
        </div>
        <div className="carousel-item">
        <Link to={"/listing"}>
          <img alt="2" src={"/ImageTest/2.jpg"} />
          </Link>
        </div>
        <div className="carousel-item">
        <Link to={"/listing"}>
          <img alt="3" src={"/ImageTest/3.jpg"} />
          </Link>
        </div>
        <div className="carousel-item">
        <Link to={"/listing"}>
          <img alt="4" src={"/ImageTest/4.jpg"} />
          </Link>
        </div>
        <div className="carousel-item">
        <Link to={"/listing"}>
          <img alt="5" src={"/ImageTest/5.jpg"} />
        </Link>
        </div>
      </div>
    );
  }
}

export default Carousel2;
