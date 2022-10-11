import React from "react";
import { useState } from "react";
import "./App.css";
import { Node } from "./Binary_tree";
import { Binary_Tree } from "./Binary_tree";

const bst = new Binary_Tree();
let idx = 0;

function App() {
  const [arr, setArr] = useState([]);

  if (bst.root === null) {
    bst.root = new Node(idx, "N", "C", "windows1");
    // console.log("===========arr 추가===========");
    //arr.push(bst.root);
    setArr([bst.root]);
    // setIdx(idx + 1);
    // console.log(arr);
    // console.log("==================================================");
  };

  const Add_Div = (e) => {
    // TODO inset 계산
    // let tmp_index = arr.findIndex((tmp_item) => tmp_item.key === e.target.id);
    // // console.log(tmp_index);
    // console.log('초기 Arr 확인');
    // console.log(arr);

    // 0을 1|2로 Div 추가하기
    // const node2 = bst.insert(bst.root, arr.length, arr);
    // console.log("e 로그 = " + e.target.id);
    const insert_result = bst.insert(arr[e.target.id], arr.length);

    if (insert_result) {
      //arr.push(insert_result[0]);
      //arr.push(insert_result[1]);
      idx = idx + 2;
      setArr([...arr, insert_result[0], insert_result[1]]);
    };

    //setArr([...arr]);
    // setIdx(idx + 1);
    // console.log('현재 index = ' + idx);
    console.log(arr);
  };

  // filter를 써서 새 배열 만들고 arr배열을 변경해줘야함.
  const Del_Div = (e) => {
    // 기존 배열에서 inset 값을 변경 후 가져와야한다.

    // setArr(arr.filter((x) => x .key!== k));
    // console.log(arr);
    // console.log(e);
    if (arr[arr[arr[e.id].p_id].p_id]) {
      bst.remove(arr[arr[arr[e.id].p_id].p_id], arr[arr[e.id].p_id], arr[e.id]);
    } else {
      bst.remove(null, arr[arr[e.id].p_id], arr[e.id]);
    } 
    console.log("삭제했음~~~");
    setArr([...arr]);
    console.log(arr);
  };

  return (
    <>
      {arr.map((e) => {
        // console.log(e.key);
        // console.log(e.node_type);

        if (e.node_type === "C") {
          // console.log(arr);

          return (
            // 가로와 세로의 길이를 비교해서 Float 를 설정한다 (None / Left or Right)
            <div
              className="div_Background" key={e.id} id={e.id}
              style={{ inset: `${e.inset_top}% ${e.inset_right}% ${e.inset_bottom}% ${e.inset_left}%` }}
            >
              <div className="div_Title">
                <button onClick={Add_Div} key={e.id} id={e.id}>
                  추가
                </button>
                <button onClick={()=>{Del_Div(e)}}>삭제</button>
              </div>
              <div className="div_Body">{e.node_text}</div>
            </div>
          );
        }
      })}
    </>
  );
}

export default App;
















  //   // TODO inset 계산
  //   // let tmp_index = arr.findIndex((tmp_item) => tmp_item.key === e.target.id);
  //   // // console.log(tmp_index);
  //   // console.log('초기 Arr 확인');
  //   // console.log(arr);

  //   // 0을 1|2로 Div 추가하기
  //   // const node2 = bst.insert(bst.root, arr.length, arr);
  //   const insert_result = bst.insert(arr[0], arr.length);

  //   if (insert_result) {
  //     arr.push(insert_result[0]);
  //     arr.push(insert_result[1]);
  //     // setArr([...insert_result[1]]);
  //     idx = idx + 2;
  //   };




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




  
  // // 0을 1|2로 Div 추가하기
  // // const node2 = bst.insert(bst.root, arr.length, arr);
  // const insert_result = bst.insert(arr[0], arr.length);

  // if (insert_result) {
  //   arr.push(insert_result[0]);
  //   arr.push(insert_result[1]);
  //   // setArr([...insert_result[1]]);
  //   idx = idx + 2;
  // };

  // // console.log("===========arr 입력 확인 ===========");
  // // console.log(arr);
  // // console.log("==================================================");

  // // console.log("===========bst 입력 확인 ===========");
  // // console.log(bst);
  // // console.log("==================================================");

  // // 1을 3|4로 Div 추가하기
  // const insert_result2 = bst.insert(arr[1], arr.length);

  // if (insert_result2) {
  //   arr.push(insert_result2[0]);
  //   arr.push(insert_result2[1]);
  //   // setArr([...insert_result[1]]);
  //   idx = idx + 2;
  // };

  // console.log("===========arr 입력 확인1 ===========");
  // console.log(arr);
  // console.log("==================================================");

  // console.log("===========bst 입력 확인1 ===========");
  // console.log(bst);
  // console.log("==================================================");

  // // 4 삭제
  // // remove(grand_node, parent_node, del_node)

  // console.log("===========4번 노드 삭제 ===========");
  // if (arr[arr[arr[4].p_id].p_id]) {
  //   bst.remove(arr[arr[arr[4].p_id].p_id], arr[arr[4].p_id], arr[4]);
  // } else {
  //   bst.remove(null, arr[arr[4].p_id], arr[4]);
  // }
  // console.log("==================================================");
  

  // console.log("===========arr 입력 확인2 ===========");
  // console.log(arr);
  // console.log("==================================================");

  // console.log("===========bst 입력 확인2 ===========");
  // console.log(bst);
  // console.log("==================================================");










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
