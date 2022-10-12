import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";




class Carousel2 extends Component {
  componentDidMount() {
    const options = {
      duration: 300,
      onCycleTo: () => {
        console.log("New Slide");
      }
    };
    M.Carousel.init(this.Carousel, options);

  }

  render() {
    return (
      <div
        ref={Carousel => {
          this.Carousel = Carousel;
        }}
        className="carousel"
      >
        <a className="carousel-item">
          <img alt="1" src={"/ImageTest/1.jpg"} />
        </a>
        <a className="carousel-item">
          <img alt="2" src={"/ImageTest/2.jpg"} />
        </a>
        <a className="carousel-item">
          <img alt="3" src={"/ImageTest/3.jpg"} />
        </a>
        <a className="carousel-item">
          <img alt="4" src={"/ImageTest/4.jpg"} />
        </a>
        <a className="carousel-item">
          <img alt="5" src={"/ImageTest/5.jpg"} />
        </a>
      </div>
    );
  }
}

export default Carousel2;
