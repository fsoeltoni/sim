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

const GolSimCreate = ({ permissions, ...props }) => {
  const initialValues = {
    created: moment.now(),
    updated: moment.now()
  };

  return permissions ? (
    <Create {...props} {...components.create}>
      <SimpleForm
        variant="outlined"
        initialValues={initialValues}
        redirect="list"
      >
        <TextInput {...fields.nama} />
      </SimpleForm>
    </Create>
  ) : null;
};

const GolSimEdit = ({ permissions, ...props }) => {
  const initialValues = {
    updated: moment()
  };

  return permissions ? (
    <Edit {...props} {...components.edit}>
      <SimpleForm variant="outlined" initialValues={initialValues}>
        <TextInput {...fields.nama} />
      </SimpleForm>
    </Edit>
  ) : null;
};

const GolSimList = ({ permissions, ...props }) => {
  return permissions ? (
    <List {...props} {...components.list}>
      <Datagrid>
        <TextField {...fields.nama} />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  ) : null;
};

const identities = {
  name: "gol_sim",
  options: {
    label: "Gol. SIM"
  },
  create: GolSimCreate,
  edit: GolSimEdit,
  list: GolSimList
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
