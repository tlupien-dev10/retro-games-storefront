import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import './App.css';
// import AuthContext from "./Components/AuthContext/AuthContext";
// import { BrowserRouter, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthContext>
//         <Route path="/*" element={<App />} />
//       </AuthContext>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
//);
