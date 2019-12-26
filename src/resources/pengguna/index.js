import { properties } from "../attrs";
import personel from "../personel";
import PenggunaCreate from "./components/PenggunaCreate";
import penyelenggara from "../penyelenggara";
import PenggunaList from "./components/PenggunaList";
import lingkup from "../lingkup";
import jenis_pengguna from "../jenis_pengguna";

const fields = {
  id: {
    source: "id",
    label: "Id"
  },
  lingkup: {
    source: lingkup.identities.name + "_id",
    label: lingkup.identities.options.label,
    reference: lingkup.identities.name,
    sort: {
      field: lingkup.fields.id.source,
      order: "ASC"
    }
  },
  jenis_pengguna: {
    source: jenis_pengguna.identities.name + "_id",
    label: jenis_pengguna.identities.options.label,
    reference: jenis_pengguna.identities.name,
    sort: {
      field: jenis_pengguna.fields.id.source,
      order: "ASC"
    }
  },
  penyelenggara: {
    source: penyelenggara.identities.name + "_id",
    label: penyelenggara.identities.options.label,
    reference: penyelenggara.identities.name,
    sort: {
      field: penyelenggara.fields.id.source,
      order: "ASC"
    }
  },
  kata_sandi: {
    source: "kata_sandi",
    label: "Kata Sandi"
  },
  personel_form: { ...personel.fields("personel") },
  personel: {
    source: personel.identities.name + "_id",
    label: personel.identities.options.label,
    reference: personel.identities.name
  }
};

const identities = {
  name: "pengguna",
  options: {
    label: "Pengguna"
  },
  create: PenggunaCreate,
  list: PenggunaList
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

const prefix = "personel";

export default { identities, fields, components, prefix };
