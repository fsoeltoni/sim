import jenis_personel from "../jenis_personel";
import gol_darah from "../gol_darah";
import pangkat from "../pangkat";
import korps from "../korps";

const fields = prefix => {
  const display_prefix = prefix ? prefix + "." : "";
  return {
    id: {
      source: display_prefix + "id",
      label: "Id"
    },
    jenis_personel: {
      source: display_prefix + jenis_personel.identities.name + "_id",
      label: jenis_personel.identities.options.label,
      reference: jenis_personel.identities.name,
      sort: {
        field: jenis_personel.fields.id.source,
        order: "ASC"
      }
    },
    no_identitas: {
      source: display_prefix + "no_identitas",
      label: "No. Identitas"
    },
    nama: {
      source: display_prefix + "nama",
      label: "Nama"
    },
    tempat_lahir: {
      source: display_prefix + "tempat_lahir",
      label: "Tempat Lahir"
    },
    tanggal_lahir: {
      source: display_prefix + "tanggal_lahir",
      label: "Tanggal Lahir"
    },
    gol_darah: {
      source: display_prefix + gol_darah.identities.name + "_id",
      label: gol_darah.identities.options.label,
      reference: gol_darah.identities.name,
      sort: {
        field: gol_darah.fields.id.source,
        order: "ASC"
      }
    },
    pangkat: {
      source: display_prefix + pangkat.identities.name + "_id",
      label: pangkat.identities.options.label,
      reference: pangkat.identities.name,
      sort: {
        field: pangkat.fields.id.source,
        order: "ASC"
      }
    },
    korps: {
      source: display_prefix + korps.identities.name + "_id",
      label: korps.identities.options.label,
      reference: korps.identities.name,
      sort: {
        field: korps.fields.id.source,
        order: "ASC"
      }
    },
    kesatuan: {
      source: display_prefix + "kesatuan",
      label: "Kesatuan"
    }
  };
};

const identities = {
  name: "personel",
  options: {
    label: "Personel"
  }
};

export default { identities, fields };
