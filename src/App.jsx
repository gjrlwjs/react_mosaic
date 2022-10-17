import React from "react";
import { useState } from "react";
import "./App.css";
import { Node } from "./Binary_tree";
import { Binary_Tree } from "./Binary_tree";

const bst = new Binary_Tree();
let idx = 0;
let node_text_idx = 0;

function App() {
  const [arr, setArr] = useState([]);

  if (bst.root === null) {
    bst.root = new Node(idx, "N", "C", "windows " + (node_text_idx + 1), 0, 0, 0, 0, 100);
    // console.log("===========arr 추가===========");
    //arr.push(bst.root);
    node_text_idx = node_text_idx + 1;
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
    const insert_result = bst.insert(arr[e.target.id], arr.length, node_text_idx);

    if (insert_result) {
      //arr.push(insert_result[0]);
      //arr.push(insert_result[1]);
      idx = idx + 2;
      node_text_idx = node_text_idx + 1;
      setArr([...arr, insert_result[0], insert_result[1]]);
    };

    //setArr([...arr]);
    // setIdx(idx + 1);
    console.log('현재 Arr ===============');
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

    // inset 재조정
    bst.resize_div(arr);

    // 배열 갱신
    setArr([...arr]);

    console.log('현재 Arr ===============');
    console.log(arr);
  };

  const onMouseDown_event = (e) => {
    console.log("==============Down=============");  
    // 마우스 다운 이벤트 발생 => 마우스의 움직임에 따라, onMouseMove 이벤트를 유지한다(onMouseUp이 될 때까지 or onMouseLeave)
    // 마우스 움직임에 따른 이벤트 등록
    const bar = e.target;
    bar.addEventListener('drag',      onMouseDrag_Event);
    bar.addEventListener('dragend',   onMouseDragend_Event);

    function onMouseDrag_Event(event) {
      console.log("==============Drag=============");
      // console.log(event);

      // 배율 변경
      if (event.x > 0 || event.y > 0) {
        // 부모노드와 자식노드에 대한 내용을 변수에 받아온다.
        let tmp_p = arr[parseInt(e.target.getAttribute('name'))];
        let tmp_l = tmp_p.left;
        let tmp_r = tmp_p.right;

        // 현재 마우스의 좌표를 기준으로, 몇퍼센트인지 역계산을 해줘야한다.
        // 대상의 부모의 Width와 Left 좌표값을 가지고 계산하면 된다.
        // ((마우스의 현재 좌표 - 기준좌표)  / 부모의 길이) * 100
        // 부모의 div type이 C | R 에 따라 다르다.
        if (tmp_p.div_type === "C") {
          tmp_l.ratio = ((event.clientX - (tmp_p.inset_left * (window.innerWidth  / 100))) / (window.innerWidth))  * 100;
        } else {
          tmp_l.ratio = ((event.clientY - (tmp_p.inset_top  * (window.innerHeight / 100))) / (window.innerHeight)) * 100;
        }
        tmp_r.ratio = 100 - tmp_l.ratio;

        // inset 재조정
        bst.resize_div(arr);

        // 배열 갱신
        setArr([...arr]);        

        // console.log("=============client 좌표");
        // console.log(event.clientX + " / " + event.clientY);
      };

      // let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

      // // the pointer is out of slider => lock the thumb within the bounaries
      // if (newLeft < 0) {
      //   newLeft = 0;
      // }
      // let rightEdge = slider.offsetWidth - thumb.offsetWidth;
      // if (newLeft > rightEdge) {
      //   newLeft = rightEdge;
      // }

      // thumb.style.left = newLeft + 'px';
    }

    function onMouseDragend_Event() {
      console.log("==============Up=============");

      bar.removeEventListener('drag',    onMouseDrag_Event);
      bar.removeEventListener('dragend', onMouseDragend_Event);

      console.log(arr);

      // // inset 재조정
      // bst.resize_div(arr);

      // // 배열 갱신
      // setArr([...arr]);
    }    
  };

  return (
    <>
      {arr.map(
        (e) => {
          if (e.node_type === "P") {
            return (
              <>
                {/* Col or Row 바를 생성한다(Right Node 기준으로) */}
                {e.div_type === "C" && (
                  <div 
                    className="div_Col" name={e.id} draggable="true" onMouseDown={onMouseDown_event} // onMouseDown={()=>{onmouseDown_event(this)}} id={e.id} 
                    style={{ inset: `${e.right.inset_top}% ${e.right.inset_right}% ${e.right.inset_bottom}% ${e.right.inset_left}%` }}></div>
                  )
                }
                {e.div_type === "R" && (
                  <div 
                    className="div_Row" name={e.id} draggable="true" onMouseDown={onMouseDown_event} //id={e.id} 
                    style={{ inset: `${e.right.inset_top}% ${e.right.inset_right}% ${e.right.inset_bottom}% ${e.right.inset_left}%` }}></div>
                  )
                }

                {/* Left, Right Node가 자식노드 타입이면 화면에 표시해준다 */}
                {e.left.node_type === "C" && 
                  (
                    <div
                      className="div_Background" //key={e.left.id} id={e.left.id}
                      style={{ inset: `${e.left.inset_top}% ${e.left.inset_right}% ${e.left.inset_bottom}% ${e.left.inset_left}%` }}
                    >
                      <div className="div_Title">
                        <button onClick={Add_Div} id={e.left.id}>
                          추가
                        </button>
                        <button onClick={()=>{Del_Div(e.left)}}>삭제</button>
                      </div>
                      <div className="div_Body">{e.left.node_text}</div>
                    </div>
                  )
                }
                {e.right.node_type === "C" && 
                  (
                    <div
                    className="div_Background" //key={e.right.id} id={e.right.id}
                    style={{ inset: `${e.right.inset_top}% ${e.right.inset_right}% ${e.right.inset_bottom}% ${e.right.inset_left}%` }}
                    >
                    <div className="div_Title">
                      <button onClick={Add_Div} id={e.right.id}>
                        추가
                      </button>
                      <button onClick={()=>{Del_Div(e.right)}}>삭제</button>
                    </div>
                    <div className="div_Body">{e.right.node_text}</div>
                    </div>
                  )
                }
              </>
            );
          } else if (e.div_type === "N" && e.node_type !== "D" && e.p_id == null) {
            return (
              <div
                className="div_Background" //key={e.id} id={e.id}
                style={{ inset: `${e.inset_top}% ${e.inset_right}% ${e.inset_bottom}% ${e.inset_left}%` }}
              >
                <div className="div_Title">
                  <button onClick={Add_Div} id={e.id}>
                    추가
                  </button>
                  <button onClick={()=>{Del_Div(e)}}>삭제</button>
                </div>
                <div className="div_Body">{e.node_text}</div>
              </div>
            );
          }
        }
      )}
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



      // const dragStart = (e) => {
    //   if (e.type === "touchstart") {
    //     initialX = e.touches[0].clientX - xOffset;
    //     initialY = e.touches[0].clientY - yOffset;
    //   } else {
    //     initialX = e.clientX - xOffset;
    //     initialY = e.clientY - yOffset;
    //   }

    //   if (e.target === dragItem) {
    //     active = true;
    //   }
    // }
    // bar.addEventListener("mousedown", dragStart, false);

    // const bar = e.target;
    // bar.addEventListener("dragstart", (k) => {
    // bar.addEventListener("drag", (k) => {
    //   console.log("드래그 하면 발생하는 이벤트");
    //   console.log(k);
    // });
    // console.log("==============mouse down=============");
    // console.log(e);


