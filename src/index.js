import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './App.css';
import App from './App';
import Tree_Component from './Tree_Component';
// import Grid_Component from './Grid_Component';

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

const onDrag_Over_shadow_event = (e) => {
  e.dataTransfer.dropEffect = "move";
  e.preventDefault();
}

const d_tree = ReactDOM.createRoot(document.getElementById('div_tree'));
d_tree.render(
  <Tree_Component />
)

const root = ReactDOM.createRoot(document.getElementById('div_mosaic_body'));
root.render(
  <>
    <div id="shadow" className="div_Shadow" draggable="true" onDragOver={onDrag_Over_shadow_event}></div>
    <App />
  </>  
);