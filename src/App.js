import React from "react";
import { Admin, Resource } from "react-admin";
import { title } from "./providers/attrs";
import data from "./providers/data";
import kota_kab from "./resources/kota_kab";
import lingkup from "./resources/lingkup";
import jenis_pomdam from "./resources/jenis_pomdam";
import jenis_personel from "./resources/jenis_personel";
import gol_darah from "./resources/gol_darah";
import pangkat from "./resources/pangkat";
import korps from "./resources/korps";
import penyelenggara from "./resources/penyelenggara";
import personel from "./resources/personel";
import pengguna from "./resources/pengguna";
import auth from "./providers/auth";

const dataProvider = data;
const authProvider = auth;

const App = () => (
  <Admin title={title} dataProvider={dataProvider} authProvider={authProvider}>
    <Resource {...pengguna.identities} />
    <Resource {...penyelenggara.identities} />
    <Resource {...personel.identities} />
    <Resource {...korps.identities} />
    <Resource {...pangkat.identities} />
    <Resource {...gol_darah.identities} />
    <Resource {...jenis_personel.identities} />
    <Resource {...jenis_pomdam.identities} />
    <Resource {...lingkup.identities} />
    <Resource {...kota_kab.identities} />
  </Admin>
);

export default App;
