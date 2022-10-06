export class Node {
  constructor(
    id,
    div_type = "N",
    node_type = "P",

    p_node = null,
    left = null,
    right = null
  ) {
    this.id = id;
    this.div_type = div_type;
    this.node_type = node_type;

    this.p_node = p_node;
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

  find_node(target_id) {
    function searchTree(node) {
      if (parseInt(node.id) === parseInt(target_id)) {
        // console.log('node.id = ' + node.id);
        // console.log('target_id = ' + target_id);

        // console.log(node);
        return node;
      } else {
        if (node.left) {
          console.log("===========Left 찾음===========");
          console.log(node);

          return searchTree(node.left);
        }

        if (node.right) {
          console.log("===========Right 찾음===========");
          console.log(node);

          return searchTree(node.right);
        }
      }

      // console.log('node.id = ' + node.id);
      // console.log('target_id = ' + target_id);
    }

    // console.log('node.id = ' + node.id);
    // console.log('target_id = ' + target_id);

    searchTree(this.root);

    console.log("===========Left 정보===========");
    console.log(this.root.left);

    return this.root;
  }

  // 추가 버튼을 통해 노드 추가 요청이 온다. 이때, 자신의 node_ID(key)를 들고 오기 때문에 Parent ID 또한 알 수 있다.
  // 기존 DIV는 좌(상)에 위치하기 때문에, 추가는 무조건 우(하)에 된다. => Right Node에 Node를 추가함.
  // 그렇다면 Left는 언제 생기냐? 추가 버튼이 눌려서 이벤트가 생성될 때, 해당 Div에 있는 key를 알 수 있으니, 그걸로 Left로 지정한다.
  // Right가 생길 때, Left가 null 일 수는 없다. 이때는 노드 자체를 삭제하고 상위 부모 자리에 Right 노드 정보를 넣어주어야한다.
  insert(parent_node, new_id) {
    console.log("===========insert log 시작============");

    // 부모 node 정보를 불러와서 left, right 로 분류하여 추가해준다.(기존 Left, 신규 Right)
    // const old_node = this.find_node(parent_id);
    const old_node = parent_node;
    const left_node = new Node(new_id, "N", "C", old_node);
    const right_node = new Node(new_id + 1, "N", "C", old_node);

    console.log("부모 ID = " + old_node.id);
    console.log(old_node);

    // target 노드를 찾아왔으니, Left Right 값을 입력한다.
    if (old_node) {
      // Left node에 대한 내용 채워주고
      // left_node.node_type = "C";

      // Right node에 대한 내용 채워주고
      // right_node.node_type = "C";

      // 기존 old도 값을 바꿔주고
      old_node.node_type = "P";

      // Left | right 입력
      old_node.left = left_node;
      old_node.right = right_node;
    }
    return old_node.left;
  }

  // remove(data) {
  //   //제거할 data의 파라미터를 두번째에 놓았다.
  //   const removeNode = function (node, data) {
  //     if (node == null) {
  //       return null;
  //     }
  //     if (data == node.data) {
  //       // node has no children ~ 밑에 뿌리가 없는 노드
  //       if (node.left == null && node.right == null) {
  //         return null;
  //       }
  //       // node has no left child  ~ left는 없는 경우 node right가 해당 삭제 데이터에 들어간다.
  //       if (node.left == null) {
  //         return node.right;
  //       }
  //       // node has no right child
  //       if (node.right == null) {
  //         return node.left;
  //       }
  //       // node has two children
  //       var tempNode = node.right;
  //       //tempNode는 삭제할 node의 right가 되고
  //       while (tempNode.left !== null) {
  //         tempNode = tempNode.left; //다시 node right의 left가 된다.
  //       }
  //       node.data = tempNode.data; //그리고 삭제 node에는 위의 tempnode가 들어가게된다.
  //       node.right = removeNode(node.right, tempNode.data);
  //       return node;
  //     } else if (data < node.data) {
  //       node.left = removeNode(node.left, data);
  //       return node;
  //     } else {
  //       node.right = removeNode(node.right, data);
  //       return node;
  //     }
  //   }
  //   this.root = removeNode(this.root, data);
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
