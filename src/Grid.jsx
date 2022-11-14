import React from "react";
import { Provider } from "react-redux";
import { Grid } from "react-redux-grid";
import { configStore } from "./Store";

function ProvidedGrid(props) {
  const newStore = configStore();
  const store = props.store || newStore;
  const plugins = props.plugins || {};
  const allProps = { ...props, store, plugins };
  return (
    <Provider store={store}>
      <Grid {...allProps} />
    </Provider>
  );
}

export default ProvidedGrid;
