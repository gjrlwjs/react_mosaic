import React from "react";
import { useState } from "react";
import "./App.css";
import { Node } from "./Binary_tree";
import { Binary_Tree } from "./Binary_tree";
import { PercentToLength } from "./ufunction";

const TOUCH_EVENT_OPTIONS = {
  capture: true,
  passive: false,
};

const bst = new Binary_Tree();
let idx = 0;
let node_text_idx = 0;

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

  const onMouseDown_bar_event = (e) => {
    console.log("==============Bar Down=============");  
    // 마우스 다운 이벤트 발생 => 마우스의 움직임에 따라, onMouseMove 이벤트를 유지한다(onMouseUp이 될 때까지 or onMouseLeave)
    // 마우스 움직임에 따른 이벤트 등록
    const bar = e.target;
    bar.addEventListener('drag',    onMouseDrag_bar_event);
    bar.addEventListener('dragend', onMouseDragend_bar_event);

    bar.addEventListener("touchmove", onMouseDrag_bar_event, TOUCH_EVENT_OPTIONS);
    bar.addEventListener("touchend", onMouseDragend_bar_event, true);
  
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

      bar.removeEventListener("touchmove", onMouseDrag_bar_event,TOUCH_EVENT_OPTIONS);
      bar.removeEventListener("touchend", onMouseDragend_bar_event, true);

      console.log(arr);

      // // inset 재조정
      // bst.resize_div(arr);

      // // 배열 갱신
      // setArr([...arr]);
    }    
  };





  const onMouseDown_div_event = (e) => {
    console.log("==============Div Down=============");  
    // 마우스 다운 이벤트 발생 => 마우스의 움직임에 따라, onMouseMove 이벤트를 유지한다(onMouseUp이 될 때까지 or onMouseLeave)
    // 마우스 움직임에 따른 이벤트 등록
    const tmp_div = e.target;
    tmp_div.addEventListener('drag',    onMouseDrag_div_event);
    tmp_div.addEventListener('dragend', onMouseDragend_div_event);

    function onMouseDrag_div_event(event) {
      console.log("==============Div Drag=============");
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

    function onMouseDragend_div_event() {
      console.log("==============Div Up=============");

      tmp_div.removeEventListener('drag',    onMouseDrag_div_event);
      tmp_div.removeEventListener('dragend', onMouseDragend_div_event);

      console.log(arr);
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
                    className="div_Col" name={e.id} draggable="true" onMouseDown={onMouseDown_bar_event} onTouchStart={onMouseDown_bar_event}// onMouseDown={()=>{onmouseDown_event(this)}} id={e.id} 
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
                      className="div_Background" //key={e.left.id} id={e.left.id}
                      style={{ inset: `${e.left.inset_top}% ${e.left.inset_right}% ${e.left.inset_bottom}% ${e.left.inset_left}%` }}
                    >
                      <div className="div_Title" name={e.id} draggable="true" onMouseDown={onMouseDown_div_event}>
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
                    <div className="div_Title" name={e.id} draggable="true" onMouseDown={onMouseDown_div_event}>
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
                <div className="div_Title" name={e.id} draggable="true" onMouseDown={onMouseDown_div_event}>
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