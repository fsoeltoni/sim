import React from "react";
import { properties } from "../attrs";
import moment from "moment";
import {
  Create,
  SimpleForm,
  TextInput,
  Edit,
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton
} from "react-admin";

const fields = {
  id: {
    source: "id",
    label: "Id"
  },
  nama: {
    source: "nama",
    label: "Nama"
  }
};

const IbukotaProvinsiCreate = ({ permissions, ...props }) => {
  const initialValues = {
    created: moment.now(),
    updated: moment.now()
  };

  return (
    <Create {...props} {...components.create}>
      <SimpleForm
        variant="outlined"
        initialValues={initialValues}
        redirect="list"
      >
        <TextInput {...fields.nama} />
      </SimpleForm>
    </Create>
  );
};

const IbukotaProvinsiEdit = ({ permissions, ...props }) => {
  const initialValues = {
    updated: moment()
  };

  return (
    <Edit {...props} {...components.edit}>
      <SimpleForm variant="outlined" initialValues={initialValues}>
        <TextInput {...fields.nama} />
      </SimpleForm>
    </Edit>
  );
};

const IbukotaProvinsiList = ({ permissions, ...props }) => {
  return (
    <List {...props} {...components.list}>
      <Datagrid>
        <TextField {...fields.nama} />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

const identities = {
  name: "ibukota_provinsi",
  options: {
    label: "Ibukota Provinsi"
  },
  create: IbukotaProvinsiCreate,
  edit: IbukotaProvinsiEdit,
  list: IbukotaProvinsiList
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

export default { identities, fields };
