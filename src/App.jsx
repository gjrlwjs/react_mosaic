import React from "react";
import { useState } from "react";
import "./App.css";
import { Node } from "./Binary_tree";
import { Binary_Tree } from "./Binary_tree";

const bst = new Binary_Tree();

function App() {

  if (bst.root === null) {
    bst.root = new Node(1, 0);
  };

  console.log('===========노드 2 추가===========');
  bst.insert(1, 2);
  console.log(bst);
  // bst.insert(3, 2);
  // // bst.insert(2);
  // // bst.insert(4);

  
  //console.log('===========노드 4 추가===========');
  //bst.insert(2, 4);
  //console.log(bst);
  


  // console.log('삭제 진행');
  // bst.remove(3, 2);
  // console.log(bst);






  // const inset_value = [
  //   // {inset: "0% 0% 0% 0%"}
  //   // Level, Parent ID, 
  //   {
  //     key: 0, 

  //     top: 0, 
  //     right: 0, 
  //     bottom: 0, 
  //     left: 0 
  //   }
  // ];

  // const [arr, setArr] = useState(inset_value);
  // const [idx, setIdx] = useState(1);

  // const Add_Div = (e) => {
  //   // TODO inset 계산
  //   // let tmp_index = arr.findIndex((tmp_item) => tmp_item.key === e.target.id);

  //   // console.log(tmp_index);
  //   console.log('초기 Arr 확인');
  //   console.log(arr);


  //   //let old = arr[e.target.id];
  //   let old = arr.find(tmp_item => parseInt(tmp_item.key) === parseInt(e.target.id));
  //   console.log('타겟 id = '+e.target.id);
  //   console.log(old);

  //   let new_top = old.top;
  //   let new_right = old.right;
  //   let new_bottom = old.bottom;
  //   let new_left = old.left;

  //   // 화면 너비 
  //   let calc_width = (100 - (old.left + old.right)) / 2;

  //   // 화면 높이 
  //   let calc_height = (100 - (old.top + old.bottom)) / 2;


  //   // (abs(R - L) > abs(B - T) ?)
  //   if (calc_width >= calc_height) {
  //     // new 값 입력
  //     new_left = old.left + calc_width;

  //     // old 값 변경
  //     old.right = old.right + calc_width;
  //   } else {
  //     // new 값 입력
  //     new_top = old.top + calc_height;

  //     // old 값 변경
  //     old.bottom = old.bottom + calc_height;
  //   }

  //   setArr([...arr, { key: idx, top: new_top, right: new_right, bottom: new_bottom, left: new_left }]);
  //   setIdx(idx + 1);

  //   console.log('현재 index = ' + idx);
  //   console.log(arr);
  // };

  // // filter를 써서 새 배열 만들고 arr배열을 변경해줘야함.
  // const Del_Div = (k) => {
  //   // 기존 배열에서 inset 값을 변경 후 가져와야한다.


    


  //   setArr(arr.filter((x) => x .key!== k));
  //   console.log(arr);
  // };

  // return (
  //   <>
  //     {arr.map((e) => {
  //       // console.log(e.key);
  //       return (
  //         // 가로와 세로의 길이를 비교해서 Float 를 설정한다 (None / Left or Right)
  //         <div 
  //           className="div_Background" key={e.key} id={e.key}
  //           style={{ inset: `${e.top}% ${e.right}% ${e.bottom}% ${e.left}%` }}
  //         >
  //           <div className="div_Title">
  //             <button onClick={Add_Div} key={e.key} id={e.key}>
  //               추가
  //             </button>
  //             <button onClick={()=>{Del_Div(e.key)}}>삭제</button>
  //           </div>
  //           <div className="div_Body">Windows {e.key}</div>
  //         </div>
  //       );
  //     })}
  //   </>
  // );
}

export default App;
