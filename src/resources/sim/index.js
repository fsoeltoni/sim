import { properties } from "../attrs";
import personel from "../personel";
import SimCreate from "./components/SimCreate";
import jenis_pengajuan_sim from "../jenis_pengajuan_sim";
import gol_sim from "../gol_sim";
import SimList from "./components/SimList";
import SimEdit from "./components/SimEdit";

const fields = {
  id: {
    source: "id",
    label: "Id"
  },
  jenis_pengajuan_sim: {
    source: jenis_pengajuan_sim.identities.name + "_id",
    label: jenis_pengajuan_sim.identities.options.label,
    reference: jenis_pengajuan_sim.identities.name,
    sort: {
      field: jenis_pengajuan_sim.fields.id.source,
      order: "ASC"
    }
  },
  gol_sim: {
    source: gol_sim.identities.name + "_id",
    label: gol_sim.identities.options.label,
    reference: gol_sim.identities.name,
    sort: {
      field: gol_sim.fields.id.source,
      order: "ASC"
    }
  },
  personel: { ...personel.fields("personel") },
  created: {
    source: "created",
    label: "Dibuat pada"
  },
  berlaku_hingga: {
    source: "berlaku_hingga",
    label: "Berlaku Hingga"
  },
  personel_id: {
    source: "personel_id",
    reference: "personel",
    label: "Personel"
  },
  penyelenggara: {
    source: "penyelenggara_id",
    reference: "penyelenggara",
    label: "Penyelenggara"
  }
};

const identities = {
  name: "sim",
  options: {
    label: "SIM"
  },
  create: SimCreate,
  list: SimList,
  edit: SimEdit
};

const components = {
  create: {
    title: properties.create + identities.options.label
  },
  edit: {
    title: properties.edit + identities.options.label
  },
  list: {
    title: properties.list + identities.options.label,
    sort: {
      field: fields.id.source,
      order: "ASC"
    }
  }
};

export default { identities, fields, components };
