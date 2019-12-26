import lingkup from "../lingkup";
import jenis_pomdam from "../jenis_pomdam";
import { properties } from "../attrs";
import personel from "../personel";
import PenyelenggaraCreate from "./components/PenyelenggaraCreate";
import PenyelenggaraList from "./components/PenyelenggaraList";

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
  jenis_pomdam: {
    source: jenis_pomdam.identities.name + "_id",
    label: jenis_pomdam.identities.options.label,
    reference: jenis_pomdam.identities.name,
    sort: {
      field: jenis_pomdam.fields.id.source,
      order: "ASC"
    }
  },
  nama: {
    source: "nama",
    label: "Nama"
  },
  kode_romawi: {
    source: "kode_romawi",
    label: "Kode Romawi"
  },
  kode: {
    source: "kode",
    label: "Kode"
  },
  markas: {
    source: "markas",
    label: "Markas"
  },
  komandan: { ...personel.fields("komandan") }
};

const identities = {
  name: "penyelenggara",
  options: {
    label: "Penyelenggara"
  },
  create: PenyelenggaraCreate,
  list: PenyelenggaraList
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

const helpers = {
  penyelenggaraOptionText: ({ kode_romawi, kode }) =>
    (kode_romawi ? kode_romawi + "/" : "") + kode
};

export default { identities, fields, components, helpers };
