import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';

// const number = document.getElementById("number");
// const increase = document.getElementById("inc");
// const decrease = document.getElementById("dec");

// increase.onclick = () => {
//   const current = parseInt(number.innerText, 10);
//   number.innerText = current + 1;
// };

// decrease.onclick = () => {
//   const current = parseInt(number.innerText, 10);
//   number.innerText = current - 1;
// };    

// const open = document.getElementById("open");
// const close = document.getElementById("close");
// const modal = document.querySelector(".modal-wrapper");
// open.onclick = () => {
//   modal.style.display = "flex";
// };
// close.onclick = () => {
//   modal.style.display = "none";
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);