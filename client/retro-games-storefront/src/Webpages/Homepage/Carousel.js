// import React, { Component } from "react";
// import M from "materialize-css";
// import "materialize-css/dist/css/materialize.min.css";

// import one from "../public/ImageTest/1.jpg";
// import two from "../public/ImageTest/2.png";
// import three from "../public/ImageTest/3.jpg";
// import four from "../public/ImageTest/4.jpg";
// import five from "../public/ImageTest/5.jpg";

// class Carousel extends Component {
//   componentDidMount() {
//     const options = {
//       duration: 300,
//       onCycleTo: () => {
//         console.log("New Slide");
//       }
//     };
//     M.Carousel.init(this.Carousel, options);

//   }

//   render() {
//     return (
//       <div
//         ref={Carousel => {
//           this.Carousel = Carousel;
//         }}
//         className="carousel"
//       >
//         <a className="carousel-item">
//           <img alt="1" src={one} />
//         </a>
//         <a className="carousel-item">
//           <img alt="2" src={two} />
//         </a>
//         <a className="carousel-item">
//           <img alt="3" src={three} />
//         </a>
//         <a className="carousel-item">
//           <img alt="4" src={four} />
//         </a>
//         <a className="carousel-item">
//           <img alt="5" src={five} />
//         </a>
//       </div>
//     );
//   }
// }

// export default Carousel;