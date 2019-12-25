import React from "react";
import { Admin } from "react-admin";
import { title } from "./providers/attrs";
import data from "./providers/data";

const dataProvider = data;

const App = () => <Admin title={title} dataProvider={dataProvider} />;

export default App;
