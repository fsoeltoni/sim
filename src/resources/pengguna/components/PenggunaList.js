import React from "react";
import {
  List,
  Datagrid,
  ReferenceField,
  TextField,
  FunctionField
} from "react-admin";
import lingkup_src from "../../lingkup";
import penyelenggara_src from "../../penyelenggara";
import personel_src from "../../personel";
import jenis_pengguna_src from "../../jenis_pengguna";
import pengguna from "..";

const PenggunaList = ({ permissions, ...props }) => {
  const {
    components: { list },
    fields: { lingkup, penyelenggara, jenis_pengguna, personel }
  } = pengguna;

  return permissions ? (
    <List {...props} {...list}>
      <Datagrid>
        <ReferenceField {...lingkup}>
          <TextField source={lingkup_src.fields.nama.source} />
        </ReferenceField>
        <ReferenceField {...penyelenggara}>
          <FunctionField
            render={penyelenggara_src.helpers.penyelenggaraOptionText}
          />
        </ReferenceField>
        <ReferenceField {...jenis_pengguna}>
          <TextField source={jenis_pengguna_src.fields.nama.source} />
        </ReferenceField>
        <ReferenceField {...personel}>
          <TextField source={personel_src.fields(null).nama.source} />
        </ReferenceField>
      </Datagrid>
    </List>
  ) : null;
};

export default PenggunaList;
