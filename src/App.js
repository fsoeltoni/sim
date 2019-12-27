import React from "react";
import { Admin, Resource } from "react-admin";
import { title } from "./providers/attrs";
import data from "./providers/data";
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
import gol_sim from "./resources/gol_sim";
import jenis_pengajuan_sim from "./resources/jenis_pengajuan_sim";
import sim from "./resources/sim";
import route from "./providers/route";
import jenis_pengguna from "./resources/jenis_pengguna";
import ibukota_provinsi from "./resources/ibukota_provinsi";
import indonesianMessages from "ra-language-indonesian";
import polyglotI18nProvider from "ra-i18n-polyglot";

const dataProvider = data;
const authProvider = auth;
const customRoutes = route;

const i18nProvider = polyglotI18nProvider(() => indonesianMessages, "id");

const App = () => (
  <Admin
    i18nProvider={i18nProvider}
    title={title}
    dataProvider={dataProvider}
    authProvider={authProvider}
    customRoutes={customRoutes}
  >
    <Resource {...sim.identities} />
    <Resource {...jenis_pengajuan_sim.identities} />
    <Resource {...gol_sim.identities} />
    <Resource {...pengguna.identities} />
    <Resource {...jenis_pengguna.identities} />
    <Resource {...penyelenggara.identities} />
    <Resource {...personel.identities} />
    <Resource {...korps.identities} />
    <Resource {...pangkat.identities} />
    <Resource {...gol_darah.identities} />
    <Resource {...jenis_personel.identities} />
    <Resource {...jenis_pomdam.identities} />
    <Resource {...lingkup.identities} />
    <Resource {...ibukota_provinsi.identities} />
  </Admin>
);

export default App;
