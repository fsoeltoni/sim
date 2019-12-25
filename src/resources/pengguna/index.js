import { properties } from "../attrs";
import personel from "../personel";
import PenggunaCreate from "./components/PenggunaCreate";
import penyelenggara from "../penyelenggara";

const fields = {
  id: {
    source: "id",
    label: "Id"
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
  personel: { ...personel.fields("personel") },
  kata_sandi: {
    source: "kata_sandi",
    label: "Kata Sandi"
  }
};

const identities = {
  name: "pengguna",
  options: {
    label: "Pengguna"
  },
  create: PenggunaCreate
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
