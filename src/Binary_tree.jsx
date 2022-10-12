export class Node {
  constructor(
    id,                           // 자신의 ID
    div_type = "N",               // DIV 표시 방식(None / Col / Row)
    node_type = "C",              // 노드 타입(Disable / Parent / Child )
    node_text = "",               // Body Text
    inset_top = 0,
    inset_right = 0,
    inset_bottom = 0,
    inset_left = 0,
    ratio = 50,

    p_id = null,
    left = null,
    right = null
  ) {
    this.id = id;
    this.div_type = div_type;
    this.node_type = node_type;
    this.node_text = node_text;

    this.inset_top = inset_top;
    this.inset_right = inset_right;
    this.inset_bottom = inset_bottom;
    this.inset_left = inset_left;
    this.ratio = ratio;

    this.p_id = p_id;
    this.left = left;
    this.right = right;
  }
}

// function find_node(target_id) {
//   function searchTree(node) {
//     if (node.id === target_id) {
//       // console.log('node.id = ' + node.id);
//       // console.log('target_id = ' + target_id);

//       return node;
//     } else {
//       if (node.left) {
//         searchTree(node.left);
//       }

//       if (node.right) {
//         searchTree(node.right);
//       }
//     }

//     console.log('node.id = ' + node.id);
//     console.log('target_id = ' + target_id);
//   }
//   // traverse(this.root);
//   return null;
// };

export class Binary_Tree {
  constructor() {
    this.root = null;
  }

  // 추가 버튼을 통해 노드 추가 요청이 온다. 이때, 자신의 node_ID(key)를 들고 오기 때문에 Parent ID 또한 알 수 있다.
  // 기존 DIV는 좌(상)에 위치하기 때문에, 추가는 무조건 우(하)에 된다. => Right Node에 Node를 추가함.
  // 그렇다면 Left는 언제 생기냐? 추가 버튼이 눌려서 이벤트가 생성될 때, 해당 Div에 있는 key를 알 수 있으니, 그걸로 Left로 지정한다.
  // Right가 생길 때, Left가 null 일 수는 없다. 이때는 노드 자체를 삭제하고 상위 부모 자리에 Right 노드 정보를 넣어주어야한다.
  insert(parent_node, new_id, text_idx) {
    console.log("===========insert 1회============");

    // 부모 node 정보를 불러와서 left, right 로 분류하여 추가해준다.(기존 Left, 신규 Right)
    // const old_node = this.find_node(parent_id);
    const old_node = parent_node;
    const left_node = new Node(new_id, "N", "C", old_node.node_text,              old_node.inset_top, old_node.inset_right, old_node.inset_bottom, old_node.inset_left, old_node.id);
    const right_node = new Node(new_id + 1, "N", "C", "windows " + (text_idx + 1), old_node.inset_top, old_node.inset_right, old_node.inset_bottom, old_node.inset_left, old_node.id);

    // console.log("부모 ID = " + old_node.id);
    // console.log(old_node);

    // target 노드를 찾아왔으니, Left Right 값을 입력한다.
    if (old_node) {
      // 화면 너비
      let calc_width = (100 - (old_node.inset_left + old_node.inset_right)) / 2;

      // 화면 높이
      let calc_height = (100 - (old_node.inset_top + old_node.inset_bottom)) / 2;

      // (abs(R - L) > abs(B - T) ?)
      if (calc_width >= calc_height) {
        // 타입변경
        old_node.div_type = "C";

        // inset 값 셋팅
        left_node.inset_right = old_node.inset_right + calc_width;
        right_node.inset_left = old_node.inset_left + calc_width;
      } else {
        // 타입변경
        old_node.div_type = "R";

        // inset 값 셋팅
        left_node.inset_bottom = old_node.inset_bottom + calc_height;
        right_node.inset_top = old_node.inset_top + calc_height;
      }

      // 기존 old도 값을 바꿔주고
      old_node.node_type = "P";
      old_node.node_text = "";




      // Left node에 대한 내용 채워주고
      // left_node.node_type = "C";

      // Right node에 대한 내용 채워주고
      // right_node.node_type = "C";

      // Left | right 입력
      // old_node.left_id  = left_node.id;
      // old_node.right_id = right_node.id;
      old_node.left  = left_node;
      old_node.right = right_node;

      return [left_node, right_node];//[left_node, left_node, right_node];
    }
    return null;//left_node;//old_node.left;
    // return left_node;//old_node.left;
  }

  // 삭제시, 
  // 자신과 형제노드 - 부모노드 간의 연결을 해제하고
  // 조부모노드와 자신의 정보를 연결해준다.
  remove(grand_node, parent_node, del_node) {
    console.log("===========delete 1회============");    
    // 조부모 노드의 존재 여부에 따라 로직이 달라짐
    if (grand_node) {

      // 형제 노드의 p_id를 바꿔준다.
      // 삭제할 노드의 위치가 Left?
      if (parent_node.left.id === del_node.id) {
        parent_node.right.p_id = grand_node.id;

        // 부모의 inset 값을 형제노드에 대입해준다.
        parent_node.right.inset_top    = parent_node.inset_top;
        parent_node.right.inset_right  = parent_node.inset_right;
        parent_node.right.inset_bottom = parent_node.inset_bottom;
        parent_node.right.inset_left   = parent_node.inset_left;

        //parent_node.right.node_text    = parent_node.node_text;

        // 삭제할 노드의 부모노드가 조부모노드 기준 L? R? 체크
        if (grand_node.left.id === parent_node.id) {
          grand_node.left = parent_node.right;
        } else {
          grand_node.right = parent_node.right;
        }
      } else {
        parent_node.left.p_id = grand_node.id;

        // 부모의 inset 값을 형제노드에 대입해준다.
        parent_node.left.inset_top    = parent_node.inset_top;
        parent_node.left.inset_right  = parent_node.inset_right;
        parent_node.left.inset_bottom = parent_node.inset_bottom;
        parent_node.left.inset_left   = parent_node.inset_left;    
        
        //parent_node.left.node_text    = parent_node.node_text;        

        // 삭제할 노드의 부모노드가 조부모노드 기준 L? R? 체크
        if (grand_node.left.id === parent_node.id) {
          grand_node.left = parent_node.left;
        } else {
          grand_node.right = parent_node.left;
        }          
      }
    } else {
      // 삭제할 노드의 위치가 Left?
      if (parent_node.left.id === del_node.id) {
        parent_node.right.p_id = null;

        // 부모의 inset 값을 형제노드에 대입해준다.
        parent_node.right.inset_top    = parent_node.inset_top;
        parent_node.right.inset_right  = parent_node.inset_right;
        parent_node.right.inset_bottom = parent_node.inset_bottom;
        parent_node.right.inset_left   = parent_node.inset_left;      
        
        //parent_node.right.node_text    = parent_node.node_text;
      } else {
        parent_node.left.p_id = null;

        // 부모의 inset 값을 형제노드에 대입해준다.
        parent_node.left.inset_top    = parent_node.inset_top;
        parent_node.left.inset_right  = parent_node.inset_right;
        parent_node.left.inset_bottom = parent_node.inset_bottom;
        parent_node.left.inset_left   = parent_node.inset_left;        
        
        //parent_node.left.node_text    = parent_node.node_text;            
      }
      // // 부모노드와 삭제노드의 Type을 D(Delete)로 바꿔주고 형제노드 정보의 부모ID를 null로 바꾼다.(Root가 된다)
      // // del_node.p_id = -1;
      // del_node.node_type = "D";

      // // parent_node.p_id  = -1;
      // // parent_node.div_type = "N";
      // parent_node.node_type = "D";

      // parent_node.left  = null;
      // parent_node.right = null;
    }

    // 부모노드와 삭제노드의 Type을 D(Delete)로 바꿔주고 형제노드 정보의 부모ID를 null로 바꾼다.(Root가 된다)
    // del_node.p_id = -1;
    del_node.node_type = "D";

    // parent_node.p_id  = -1;
    // parent_node.div_type = "N";
    parent_node.node_type = "D";

    parent_node.left  = null;
    parent_node.right = null;    
    // this.root = removeNode(this.root, del_id);
    return;
  }

  // resize_div(tmp_arr) {
  //   tmp_arr.forEach(tmp_node => {
  //     // 부모 노드 대비 자신의 비율에 따라, Inset 값을 재조정해준다.(= 노드타입이 P인 경우, 하위 노드의 inset 값을 재조정함. 하위 노드가 P인 경우도 마찬가지)
  //     if (tmp_node.node_type === "P") {

  //     }


  //     console.log(tmp_node);
  //   });

  // }
}

// export class Binary_Tree {
//   constructor() {
//     this.root = null;
//   }

//   // 추가 버튼을 통해 노드 추가 요청이 온다. 이때, 자신의 node_ID(key)를 들고 오기 때문에 Parent ID 또한 알 수 있다.
//   // 기존 DIV는 좌(상)에 위치하기 때문에, 추가는 무조건 우(하)에 된다. => Right Node에 Node를 추가함.
//   // 그렇다면 Left는 언제 생기냐? 추가 버튼이 눌려서 이벤트가 생성될 때, 해당 Div에 있는 key를 알 수 있으니, 그걸로 Left로 지정한다.
//   // Right가 생길 때, Left가 null 일 수는 없다. 이때는 노드 자체를 삭제하고 상위 부모 자리에 Right 노드 정보를 넣어주어야한다.

//   insert(new_ID, node_ID) {
//     const node = this.root;
//     if (node === null) {
//       // this.root = new Node(new_ID);
//       this.root = new Node(1, 0, 'N', 'C');

//       console.log('node = null');
//       console.log(this.root);
//       return;
//     } else {
//       const searchTree = function (node) {
//         // p_ID를 찾아서 new_ID 자식 노드를 추가한다.
//         // 무조건 1이 부모노드로 존재하기 때문에, 재귀를 반복해서 부모노드를 찾아주고 처리한다.
//         if (node_ID === node.id) {

//         } else {
//           if (node.left === null) {
//             node.left = new Node(new_ID);
//             return;
//           } else if (node.left !== null) {
//             //left에 함수 있을 시 재귀 함수 적용
//             return searchTree(node.left);
//           }

//           return searchTree(node.left);

//         };

//         if (new_ID < node.id) {
//           // console.log('if 1 node = ' + new_ID + ' / ' + node.id);
//           if (node.left === null) {
//             node.left = new Node(new_ID);
//             return;
//           } else if (node.left !== null) {
//             //left에 함수 있을 시 재귀 함수 적용
//             return searchTree(node.left);
//           }
//         } else if (new_ID > node.id) {
//           // console.log('if 2 node = ' + new_ID + ' / ' + node.id);

//           if (node.right === null) {
//             node.right = new Node(new_ID);
//             return;
//           } else if (node.right !== null) {
//             return searchTree(node.right);
//           }
//         } else {
//           // console.log('if 3 node = ' + new_ID + ' / ' + node.id);

//           return null;
//         }
//       };
//       return searchTree(node);
//     }
//   }

//   remove(new_ID) {
//     //제거할 data의 파라미터를 두번째에 놓았다.
//     const removeNode = function (node, new_ID) {
//       if (node == null) {
//         return null;
//       }
//       if (new_ID == node.id) {
//         // node has no children ~ 밑에 뿌리가 없는 노드
//         if (node.left == null && node.right == null) {
//           return null;
//         }
//         // node has no left child  ~ left는 없는 경우 node right가 해당 삭제 데이터에 들어간다.
//         if (node.left == null) {
//           return node.right;
//         }
//         // node has no right child
//         if (node.right == null) {
//           return node.left;
//         }
//         // node has two children
//         var tempNode = node.right;
//         //tempNode는 삭제할 node의 right가 되고
//         while (tempNode.left !== null) {
//           tempNode = tempNode.left; //다시 node right의 left가 된다.
//         }
//         node.data = tempNode.data; //그리고 삭제 node에는 위의 tempnode가 들어가게된다.
//         node.right = removeNode(node.right, tempNode.id);
//         return node;
//       } else if (new_ID < node.id) {
//         node.left = removeNode(node.left, new_ID);
//         return node;
//       } else {
//         node.right = removeNode(node.right, new_ID);
//         return node;
//       }
//     }
//     this.root = removeNode(this.root, new_ID);
//   }
// }

//export default Binary_Tree Node;




// find_node(target_id) {
//   function searchTree(node) {
//     if (parseInt(node.id) === parseInt(target_id)) {
//       // console.log('node.id = ' + node.id);
//       // console.log('target_id = ' + target_id);

//       // console.log(node);
//       return node;
//     } else {
//       if (node.left) {
//         console.log("===========Left 찾음===========");
//         console.log(node);

//         return searchTree(node.left);
//       }

//       if (node.right) {
//         console.log("===========Right 찾음===========");
//         console.log(node);

//         return searchTree(node.right);
//       }
//     }

//     // console.log('node.id = ' + node.id);
//     // console.log('target_id = ' + target_id);
//   }

//   // console.log('node.id = ' + node.id);
//   // console.log('target_id = ' + target_id);

//   searchTree(this.root);

//   console.log("===========Left 정보===========");
//   console.log(this.root.left);

//   return this.root;
// }