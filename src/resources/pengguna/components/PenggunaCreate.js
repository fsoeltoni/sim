import React, { useState } from "react";
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  FormDataConsumer
} from "react-admin";
import moment from "moment";
import pengguna from "..";
import PenggunaCreateToolbar from "./helpers/PenggunaCreateToolbar";
import PersonelForm from "../../personel/components/PersonelForm";
import lingkup_src from "../../lingkup";
import jenis_pengguna_src from "../../jenis_pengguna";
import penyelenggara_src from "../../penyelenggara";

const created = moment();

const PenggunaCreate = ({ permissions, ...props }) => {
  const {
    components: { create },
    fields: { lingkup, penyelenggara, jenis_pengguna, kata_sandi },
    prefix
  } = pengguna;

  const [personel, setPersonel] = useState();

  const initialValues = {
    created: created,
    updated: created
  };

  return permissions ? (
    <Create {...props} {...create} record={{ personel: personel }}>
      <SimpleForm
        variant="outlined"
        toolbar={<PenggunaCreateToolbar />}
        initialValues={initialValues}
      >
        <ReferenceInput {...lingkup}>
          <SelectInput optionText={lingkup_src.fields.nama.source} />
        </ReferenceInput>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData[lingkup.source] && (
              <ReferenceInput
                {...penyelenggara}
                {...rest}
                filter={{ lingkup_id: formData[lingkup.source] }}
              >
                <SelectInput
                  optionText={penyelenggara_src.helpers.penyelenggaraOptionText}
                />
              </ReferenceInput>
            )
          }
        </FormDataConsumer>
        <ReferenceInput {...jenis_pengguna}>
          <SelectInput optionText={jenis_pengguna_src.fields.nama.source} />
        </ReferenceInput>
        <PersonelForm
          prefix={prefix}
          setPersonel={setPersonel}
          personel={personel}
        />
        <TextInput {...kata_sandi} />
      </SimpleForm>
    </Create>
  ) : null;
};

export default PenggunaCreate;
