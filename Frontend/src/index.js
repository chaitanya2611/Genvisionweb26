import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  <script src="./script.js"></script>
  </React.StrictMode>
  
);
// window.addEventListener("scroll", () => {
//   const header = document.querySelector("header");
//   if (window.scrollY > 50) {
//     header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
//   } else {
//     header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
//   }
// });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
