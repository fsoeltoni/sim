import React, { useState } from "react";
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput
} from "react-admin";
import moment from "moment";
import penyelenggara_src from "../../penyelenggara";
import pengguna from "..";
import PenggunaCreateToolbar from "./helpers/PenggunaCreateToolbar";
import PersonelForm from "../../personel/components/PersonelForm";

const created = moment();

const PenggunaCreate = props => {
  const {
    components: { create },
    fields: { penyelenggara, kata_sandi }
  } = pengguna;
  const [personel, setPersonel] = useState();

  const initialValues = {
    created: created,
    updated: created
  };

  return (
    <Create {...props} {...create} record={{ personel: personel }}>
      <SimpleForm
        variant="outlined"
        toolbar={<PenggunaCreateToolbar />}
        initialValues={initialValues}
      >
        <ReferenceInput {...penyelenggara}>
          <SelectInput optionText={penyelenggara_src.fields.nama.source} />
        </ReferenceInput>
        <TextInput {...kata_sandi} />
        <PersonelForm
          prefix="personel"
          setPersonel={setPersonel}
          personel={personel}
        />
      </SimpleForm>
    </Create>
  );
};

export default PenggunaCreate;
