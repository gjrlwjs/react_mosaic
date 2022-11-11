import React from "react";
// import { Grid } from "./Grid";
import Grid from "./Grid";

// This is just a demo. The core files are in the grid folder.
// Copy that into your repo and use this example as usage documentation.

// import { ProvidedGrid } from "./grid";
// export const Grid = ProvidedGrid;

const columns = [
  {
    name: "Name",
    width: "10%",
    className: "additional-class",
    dataIndex: "name"
  },
  {
    name: "Phone Number",
    width: "20%",
    dataIndex: "phone",
    className: "additional-class"
  },
  {
    name: "email",
    width: "25%",
    dataIndex: "email",
    className: "additional-class",
    defaultSortDirection: "descend"
  }
];

const data = [
  { name: "Joe", phone: "111-1111", email: "joe@joe.com" },
  { name: "Amy", phone: "222-2222", email: "amy@amy.com" },
  { name: "Sarah", phone: "333-3333", email: "sarah@sarah.com" }
];

const events = {
  HANDLE_CELL_CLICK: ({ row }) => alert(row.name)
};

function Grid_Component() {
  return (
    <div>
      <Grid stateKey={"foo"} columns={columns} data={data} events={events} />
    </div>
  );
}

export default Grid_Component;

