import React from "react";
import { Toolbar } from "react-admin";
import PenggunaCreateButton from "./PenggunaCreateButton";

const PenggunaCreateToolbar = props => {
  return (
    <Toolbar {...props}>
      <PenggunaCreateButton />
    </Toolbar>
  );
};

export default PenggunaCreateToolbar;
