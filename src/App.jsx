import React from "react";
import { useState } from "react";
import "./App.css";
import { Node } from "./Binary_tree";
import { Binary_Tree } from "./Binary_tree";
import { PercentToLength, PercentToPx, Position_Check, Position_Fix } from "./ufunction";

const bst = new Binary_Tree();
let idx = 0;
let node_text_idx = 0;

let drag_node = null;                 // Null or Node
let drag_state = "N";                 // N / T / R / B / L
let drag_bleft = false;               // T = Left / F = Right

function App() {
  const [arr, setArr] = useState([]);

  if (bst.root === null) {
    console.log("===========Root 생성===========");
    bst.root = new Node(idx, "N", "C", "windows " + (node_text_idx + 1), 0, 0, 0, 0, 100);
    //arr.push(bst.root);
    node_text_idx = node_text_idx + 1;
    setArr([bst.root]);

    console.log(arr);
  };

// ==================================================================================================================================================
// =================================================================== Button Event =================================================================
// ==================================================================================================================================================
  const Add_Div = (e) => {
    // TODO inset 계산
    console.log('===========DIV 추가===========');

    // 0을 1|2로 Div 추가하기
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
    console.log(arr);
  };

  // filter를 써서 새 배열 만들고 arr배열을 변경해줘야함.
  const Del_Div = (e) => {
    if (arr[e.id].p_id === null){
      return false;
    }

    console.log('===========DIV 삭제===========');

    // 기존 배열에서 inset 값을 변경 후 가져와야한다.
    if (arr[arr[arr[e.id].p_id].p_id]) {
      bst.remove(arr[arr[arr[e.id].p_id].p_id], arr[arr[e.id].p_id], arr[e.id]);
    } else {
      bst.remove(null, arr[arr[e.id].p_id], arr[e.id]);
    } 

    // inset 재조정
    bst.resize_div(arr);

    // 배열 갱신
    setArr([...arr]);

    console.log(arr);
  };

// ==================================================================================================================================================
// =================================================================== Bar Event ====================================================================
// ==================================================================================================================================================
  const onMouseDown_bar_event = (e) => {
    drag_node = null;

    console.log("==============Bar Down=============");  
    // 마우스 다운 이벤트 발생 => 마우스의 움직임에 따라, onMouseMove 이벤트를 유지한다(onMouseUp이 될 때까지 or onMouseLeave)
    // 마우스 움직임에 따른 이벤트 등록
    const bar = e.target;
    bar.addEventListener('drag',    onMouseDrag_bar_event);
    bar.addEventListener('dragend', onMouseDragend_bar_event);

    // bar.addEventListener("touchmove", onMouseDrag_bar_event, TOUCH_EVENT_OPTIONS);
    // bar.addEventListener("touchend", onMouseDragend_bar_event, true);
  
    function onMouseDrag_bar_event(event) {
      console.log("==============Bar Drag=============");
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
          // tmp_l.ratio = ((event.clientX - (tmp_p.inset_left * (window.innerWidth  / 100))) / (window.innerWidth))  * 100;
          tmp_l.ratio = ((event.clientX - (tmp_p.inset_left * (window.innerWidth  / 100))) / (PercentToLength(window.innerWidth, tmp_p.inset_left, tmp_p.inset_right)))  * 100;
        } else {
          // tmp_l.ratio = ((event.clientY - (tmp_p.inset_top  * (window.innerHeight / 100))) / (window.innerHeight)) * 100;
          tmp_l.ratio = ((event.clientY - (tmp_p.inset_top * (window.innerHeight  / 100))) / (PercentToLength(window.innerHeight, tmp_p.inset_top, tmp_p.inset_bottom))) * 100;
        }
        tmp_r.ratio = 100 - tmp_l.ratio;

        // inset 재조정
        bst.resize_div(arr);

        // 배열 갱신
        setArr([...arr]);        

        // console.log("=============client 좌표");
        // console.log(event.clientX + " / " + event.clientY);
      };
    }

    function onMouseDragend_bar_event() {
      console.log("==============Bar Up=============");

      bar.removeEventListener('drag',    onMouseDrag_bar_event);
      bar.removeEventListener('dragend', onMouseDragend_bar_event);

      // bar.removeEventListener("touchmove", onMouseDrag_bar_event,TOUCH_EVENT_OPTIONS);
      // bar.removeEventListener("touchend", onMouseDragend_bar_event, true);

      console.log(arr);

      // // inset 재조정
      // bst.resize_div(arr);

      // // 배열 갱신
      // setArr([...arr]);
    }    
  };

// ==================================================================================================================================================
// =================================================================== Div Event ====================================================================
// ==================================================================================================================================================
const onDragStart_div_event = (e) => {
    console.log("==============Div Drag Start=============");  
    //console.log("Node id = " + e.target.parentElement.getAttribute("name") + " / X 좌표 = " + e.clientX + " / 좌표 Y = " + e.clientY);
    //console.log(e.target);
    // e.preventDefault();
    // console.log(drag_node);

    // 마우스 Over 이벤트 발생 => 마우스의 움직임에 따라, onMouseMove 이벤트를 유지한다(onMouseUp이 될 때까지 or onMouseLeave)
    drag_node  = arr[parseInt(e.target.parentElement.getAttribute("name"))];
    drag_state = "N";
    drag_bleft = false;
  }

  const onDragOver_div_event = (e) => {  
    if (drag_node === null) {
      return false;
    }

    e.preventDefault();

    let tmp_node = arr[parseInt(e.target.parentElement.getAttribute("name"))];

    let point_x      = PercentToPx(window.innerWidth,  tmp_node.inset_left);
    let point_y      = PercentToPx(window.innerHeight, tmp_node.inset_top);
    let point_width  = PercentToLength(window.innerWidth,  tmp_node.inset_left, tmp_node.inset_right);
    let point_height = PercentToLength(window.innerHeight, tmp_node.inset_top,  tmp_node.inset_bottom);

    // console.log("==============Drag Over=============");
    // console.log("Node id = " + e.target.parentElement.getAttribute("name") + " / X 좌표 = " + e.clientX + " / 좌표 Y = " + e.clientY);
    //console.log(e.target);

    // 마우스 움직임에 따른 이벤트 
    // target의 영역 기준으로 마우스 좌표가 9등분 중에 어디에 속해있는지 확인해야한다.
    // Left(x) / Top(y) / Width(px) / Height(px)을 입력하면 LT ~ RB(1 ~ 9) 중에 어디인지 반환해준다.
    let tmp_width_length  = (point_width  * 0.33);
    let tmp_height_length = (point_height * 0.33);

    let result_X = Position_Check(e.clientX, point_x, tmp_width_length);
    let result_Y = Position_Check(e.clientY, point_y, tmp_height_length);    

    // point_width 의 위치를 찾고, 결정한다.
    let tmp_position = Position_Fix(result_X, result_Y);

    // 겹치는 부분이 있으면 좀 다르게 처리해야함.
    if        (tmp_position === "LT") {
      if (drag_state !== "T") {drag_state = "L"}
    } else if (tmp_position === "RT") {
      if (drag_state !== "T") {drag_state = "R"}
    } else if (tmp_position === "LB") {
      if (drag_state !== "B") {drag_state = "L"}
    } else if (tmp_position === "RB") {
      if (drag_state !== "B") {drag_state = "R"}
    } else                    {drag_state = tmp_position}

    if ((tmp_position === "L") || (tmp_position === "T")){drag_bleft = true}
    else                                                 {drag_bleft = false}

    // 현재 마우스의 X, Y 좌표에 따라, 어떤 구역에 속해있는지 확인해서 쉐도우 DIV를 뿌려준다.
    console.log(tmp_position);
    console.log(drag_state);
    console.log(drag_bleft);
  }  

  const onDrop_div_event = (e) => {  
    if (drag_node === null) {
      return false;
    }

    e.preventDefault();

    console.log("==============Drop=============");
    console.log("Node id = " + e.target.parentElement.getAttribute("name") + " / X 좌표 = " + e.clientX + " / 좌표 Y = " + e.clientY);
    console.log(e.target);

    if (e.target.tagName !== "BUTTON") {
      if (drag_node.id !== parseInt(e.target.parentElement.getAttribute("name"))) {
        // 위치에 따라, Col | Row   /   Left | Right 를 지정하여 Insert / remove 해줘야한다.
        const change_result = bst.change(arr[parseInt(e.target.parentElement.getAttribute("name"))], arr.length, drag_node, drag_state, drag_bleft);
  
        if (change_result) {
          idx = idx + 2;
          // node_text_idx = node_text_idx + 1;
  
          arr.push(change_result[0]);
          arr.push(change_result[1]);
          // setArr([...arr, change_result[0], change_result[1]]);
        };
  
        // 기존 배열에서 inset 값을 변경 후 가져와야한다.
        if (arr[arr[arr[drag_node.id].p_id].p_id]) {
          bst.remove(arr[arr[arr[drag_node.id].p_id].p_id], arr[arr[drag_node.id].p_id], arr[drag_node.id]);
        } else {
          bst.remove(null, arr[arr[drag_node.id].p_id], arr[drag_node.id]);
        } 
        // drag_node = null;
        // inset 재조정
        bst.resize_div(arr);
  
        console.log("==============Drop after Log=============");
        console.log(drag_node);
        console.log(drag_state);
        console.log(drag_bleft);
        console.log(arr);
  
        // 배열 갱신
        setArr([...arr]);
      }
    }
    drag_node  = null;
    drag_state = "N";
    drag_bleft = false;
  }

// ==================================================================================================================================================
// ================================================================= 반환값(랜더링) ==================================================================
// ==================================================================================================================================================
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
                    className="div_Col" name={e.id} draggable="true" onMouseDown={onMouseDown_bar_event} //onTouchStart={onMouseDown_bar_event}
                    style={{ inset: `${e.right.inset_top}% ${e.right.inset_right}% ${e.right.inset_bottom}% ${e.right.inset_left}%` }}></div>
                  )
                }
                {e.div_type === "R" && (
                  <div 
                    className="div_Row" name={e.id} draggable="true" onMouseDown={onMouseDown_bar_event} //id={e.id} 
                    style={{ inset: `${e.right.inset_top}% ${e.right.inset_right}% ${e.right.inset_bottom}% ${e.right.inset_left}%` }}></div>
                  )
                }

                {/* Left, Right Node가 자식노드 타입이면 화면에 표시해준다 */}
                {e.left.node_type === "C" && 
                  (
                    <div
                      className="div_Background" name={e.left.id} onDragOver={onDragOver_div_event} onDrop={onDrop_div_event}
                      style={{ inset: `${e.left.inset_top}% ${e.left.inset_right}% ${e.left.inset_bottom}% ${e.left.inset_left}%` }}
                    >
                      <div className="div_Title" draggable="true" onDragStart={onDragStart_div_event}>
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
                    className="div_Background" name={e.right.id} onDragOver={onDragOver_div_event} onDrop={onDrop_div_event} //onDragEnd={onDragEnd_div_event}
                    style={{ inset: `${e.right.inset_top}% ${e.right.inset_right}% ${e.right.inset_bottom}% ${e.right.inset_left}%` }}
                    >
                    <div className="div_Title" draggable="true" onDragStart={onDragStart_div_event}>
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
                className="div_Background" name={e.id} onDragOver={onDragOver_div_event} onDrop={onDrop_div_event} //onDragEnd={onDragEnd_div_event} // draggable="true" onDragEnd={onDragEnd_div_event} onDrag={onDrag_div_event} // onMouseDown_div_event} //key={e.left.id} id={e.left.id}
                style={{ inset: `${e.inset_top}% ${e.inset_right}% ${e.inset_bottom}% ${e.inset_left}%` }}
              >
                <div className="div_Title" draggable="true" onDragStart={onDragStart_div_event} //onDragOver={onDragOver_div_event} onDragEnd={onDragEnd_div_event}
                >  
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




    // const tmp_div = e.target.parentElement;
    // tmp_div.addEventListener('dragover', onMouseDragover_div_event);
    // tmp_div.addEventListener('drop',     onMouseDrop_div_event);
    // // tmp_div.addEventListener('drag',    onMouseDrag_div_event);
    // // tmp_div.addEventListener('dragend', onMouseDragend_div_event);
      // 현재 드래그한 좌표의 엘리먼트를 받아와서 

      // // 부모노드와 자식노드에 대한 내용을 변수에 받아온다.
      // let tmp_p = arr[parseInt(e.target.getAttribute('name'))];
      // let tmp_l = tmp_p.left;
      // let tmp_r = tmp_p.right;

      // // 현재 마우스의 좌표를 기준으로, 몇퍼센트인지 역계산을 해줘야한다.
      // // 대상의 부모의 Width와 Left 좌표값을 가지고 계산하면 된다.
      // // ((마우스의 현재 좌표 - 기준좌표)  / 부모의 길이) * 100
      // // 부모의 div type이 C | R 에 따라 다르다.
      // if (tmp_p.div_type === "C") {
      //   // tmp_l.ratio = ((event.clientX - (tmp_p.inset_left * (window.innerWidth  / 100))) / (window.innerWidth))  * 100;
      //   tmp_l.ratio = ((event.clientX - (tmp_p.inset_left * (window.innerWidth  / 100))) / (PercentToLength(window.innerWidth, tmp_p.inset_left, tmp_p.inset_right)))  * 100;
      // } else {
      //   // tmp_l.ratio = ((event.clientY - (tmp_p.inset_top  * (window.innerHeight / 100))) / (window.innerHeight)) * 100;
      //   tmp_l.ratio = ((event.clientY - (tmp_p.inset_top * (window.innerHeight  / 100))) / (PercentToLength(window.innerHeight, tmp_p.inset_top, tmp_p.inset_bottom))) * 100;
      // }
      // tmp_r.ratio = 100 - tmp_l.ratio;

      // // inset 재조정
      // bst.resize_div(arr);

      // // 배열 갱신
      // setArr([...arr]);

      // // console.log("=============client 좌표");
      // // console.log(event.clientX + " / " + event.clientY);


      
  // function onMouseDrop_div_event() {
  //   console.log("==============Div Drop=============");

  //   tmp_div.removeEventListener('dragover', onMouseDragover_div_event);
  //   tmp_div.removeEventListener('drop',     onMouseDrop_div_event);
  //   // tmp_div.removeEventListener('drag',    onMouseDrag_div_event);
  //   // tmp_div.removeEventListener('dragend', onMouseDragend_div_event);

  //   console.log(arr);
  // }