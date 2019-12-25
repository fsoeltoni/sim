import React from "react";
import { Admin, Resource } from "react-admin";
import { title } from "./providers/attrs";
import data from "./providers/data";
import kota_kab from "./resources/kota_kab";

const dataProvider = data;

const App = () => (
  <Admin title={title} dataProvider={dataProvider}>
    <Resource {...kota_kab.identities} />
  </Admin>
);

export default App;
