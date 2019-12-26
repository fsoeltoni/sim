import React from "react";
import {
  List,
  Datagrid,
  DateField,
  ReferenceField,
  TextField,
  EditButton
} from "react-admin";
import sim from "..";

const SimList = ({ permissions, ...props }) => {
  const {
    components: { list },
    fields: {
      jenis_pengajuan_sim,
      gol_sim,
      created,
      berlaku_hingga,
      personel_id,
      penyelenggara
    }
  } = sim;

  return (
    <List {...props} {...list}>
      <Datagrid>
        <DateField {...created} />
        <DateField {...berlaku_hingga} />
        <ReferenceField {...jenis_pengajuan_sim}>
          <TextField source="nama" />
        </ReferenceField>
        <ReferenceField {...gol_sim}>
          <TextField source="nama" />
        </ReferenceField>
        <ReferenceField {...personel_id}>
          <TextField source="nama" />
        </ReferenceField>
        <ReferenceField {...penyelenggara}>
          <TextField source="kode" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );
};
export default SimList;
