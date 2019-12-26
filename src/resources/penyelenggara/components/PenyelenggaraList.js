import React from "react";
import { List, Datagrid, ReferenceField, TextField } from "react-admin";
import penyelenggara from "..";
import lingkup_src from "../../lingkup";
import personel_src from "../../personel";
import ibukota_provinsi_src from "../../ibukota_provinsi";

const PenyelenggaraList = ({ permissions, ...props }) => {
  const {
    components: { list },
    fields: { lingkup, kode, markas, komandan }
  } = penyelenggara;

  return permissions ? (
    <List {...props} {...list}>
      <Datagrid>
        <ReferenceField {...lingkup}>
          <TextField source={lingkup_src.fields.nama.source} />
        </ReferenceField>
        <TextField {...kode} />
        <ReferenceField {...komandan}>
          <TextField source={personel_src.fields().nama.source} />
        </ReferenceField>
        <ReferenceField {...markas}>
          <TextField source={ibukota_provinsi_src.fields.nama.source} />
        </ReferenceField>
      </Datagrid>
    </List>
  ) : null;
};

export default PenyelenggaraList;
