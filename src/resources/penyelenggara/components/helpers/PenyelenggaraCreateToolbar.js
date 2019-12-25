import React from "react";
import { Toolbar } from "react-admin";
import PenyelenggaraCreateButton from "./PenyelenggaraCreateButton";

const PenyelenggaraCreateToolbar = props => {
  return (
    <Toolbar {...props}>
      <PenyelenggaraCreateButton />
    </Toolbar>
  );
};

export default PenyelenggaraCreateToolbar;
