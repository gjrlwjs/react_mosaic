import React from "react";
import { useState } from "react";
import './App.css';

function Main() {
  const add_button = document.getElementById("Main_Add");

  add_button.onclick = () => {
    Add_Div();
  };

  // const purpleCuteSlime = {
  //   name: '슬라임',
  //   attribute: 'cute',
  //   color: 'purple'
  // };
  
  // const {...CuteSlime} = purpleCuteSlime;
  // // console.log(color);
  // console.log(CuteSlime);
  //   const [arr, setArr] = useState([
  //     <div key="0" style={{ border: "3px solid black" }}>0</div>,
  //     <div key="1" style={{ border: "3px solid black" }}>1</div>,
  //     <div key="2" style={{ border: "3px solid black" }}>2</div>,
  //   ]);

  const [arr, setArr] = useState([]);
  const [idx, setIdx] = useState(0);

  const Add_Div = () => {
    setArr([...arr, idx]);
    setIdx(idx + 1);
    console.log(arr);
  };

  // filter를 써서 새 배열 만들고 arr배열을 변경해줘야함.
  const Del_Div = (k) => {
    setArr(arr.filter((x) => x !== k));
  };

  // const background_div = document.getElementById("Main_Add");  
  // const divvv = document.querySelector(".div_Background");

  return (
    <>
      {/* 
      <div className="div_Main">
        <div className="div_Title">
          <button onClick={Add_Div}>추가</button>
        </div>
      </div>
       */}

       {/* 새로 추가하는 DIV 덩어리 이전에 이미 내용이 있었다면, Width 또는 Height를 50%로 하여 classname을 바꿔야만한다.
           그걸 어떻게 알지? 
           배열이 class나 구조체 형태라면 변수를 가지고 있어서 그놈의 Type이 L인지 R인지 보고 정하면 되지 않나?
           배열의 내용으로 랜더링이 되야되는데 어떻게 해?
           
           이도저도 아니다 싶으면 map에서 인자 구별해서 그릴때 type을 보고 따로 그리던지 아니 근데 왜 map에서 if 안먹냐고!!!!
       
       
       
       */}

      {/* Display 함수 */}
      {arr.map((e) => (
        <div className="div_Background_L">
          <div key={e} className="div_Title">
            <button onClick={Add_Div}>추가</button>
            <button
              onClick={() => {
                Del_Div(e);
              }}
            >
              삭제
            </button>
          </div>
          <div className="div_Body">
            Windows {e}
          </div>
        </div>
      ))
      }
    </>    
  );
}


export default Main;