import React from "react";
import { List, Datagrid, ReferenceField, TextField } from "react-admin";
import moment from "moment";
import penyelenggara from "..";

const created = moment();

const PenyelenggaraList = ({ permissions, ...props }) => {
  const {
    components: { list },
    fields: { lingkup, jenis_pomdam, nama, kode_romawi, kode, markas }
  } = penyelenggara;

  return (
    <List {...props} {...list}>
      <Datagrid>
        <ReferenceField {...lingkup}>
          <TextField source="nama" />
        </ReferenceField>
        <TextField {...nama} />
        <TextField {...kode} />
        <TextField {...kode_romawi} />
        <ReferenceField
          source="komandan_id"
          label="Komandan"
          reference="personel"
        >
          <TextField source="nama" />
        </ReferenceField>
      </Datagrid>
    </List>
  );
};

export default PenyelenggaraList;
