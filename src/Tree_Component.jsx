// import React from 'react'
// import ReactDOM from 'react-dom'
// import { useState } from "react";
import Tree from 'react-animated-tree'
import './Tree_Component.css'

const treeStyles = {
  position: 'absolute',
  top: 10,
  left: 10,
  color: 'white',
  fill: 'white',
  width: '100%'
}

const typeStyles = {
  fontSize: '2em',
  verticalAlign: 'middle'
}

function Tree_Component() {
  // const [data, setData] = useState([]);

  return(
    <>
      <Tree content="Host" open style={treeStyles}>
        {/* <Tree content="hello" type={<span style={typeStyles}>🙀</span>} canHide /> */}
        <Tree content="OS" open>
          <Tree content="Windows" open>
            <Tree content="Server 1" style={{ color: '#63b1de' }} />
            <Tree content="Server 2" style={{ color: '#63b1de' }} />
            <Tree content="Server 3" style={{ color: '#666666' }} />
          </Tree>

          <Tree content="Linux" open>
            <Tree content="Ubuntu Server" style={{ color: '#63b1de' }} />
            <Tree content="Docker Server" style={{ color: '#63b1de' }} />
          </Tree>
        </Tree>
      </Tree>
    </>
  )
}

export default Tree_Component;