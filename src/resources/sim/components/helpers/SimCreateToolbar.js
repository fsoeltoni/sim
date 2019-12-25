import React from "react";
import { Toolbar } from "react-admin";
import SimCreateButton from "./SimCreateButton";

const SimCreateToolbar = props => {
  return (
    <Toolbar {...props}>
      <SimCreateButton />
    </Toolbar>
  );
};

export default SimCreateToolbar;
