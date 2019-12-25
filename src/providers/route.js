import React from "react";
import { Route } from "react-router-dom";
import SimPrint from "../resources/sim/components/helpers/print/SimPrint";

export default [
  <Route exact path="/:basePath/print/:id" component={SimPrint} />
];
