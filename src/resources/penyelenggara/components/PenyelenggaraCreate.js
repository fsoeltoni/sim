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
import penyelenggara from "..";
import lingkup_src from "../../lingkup";
import jenis_pomdam_src from "../../jenis_pomdam";
import PersonelForm from "../../personel/components/PersonelForm";
import PenyelenggaraCreateToolbar from "./helpers/PenyelenggaraCreateToolbar";

const created = moment();

const PenyelenggaraCreate = props => {
  const {
    components: { create },
    fields: { lingkup, jenis_pomdam, nama, kode_romawi, kode, markas }
  } = penyelenggara;
  const [personel, setPersonel] = useState();

  const isPomdam = formData =>
    formData[lingkup.source] && formData[lingkup.source] === 2;

  const isUmum = formData =>
    isPomdam(formData) &&
    formData[jenis_pomdam.source] &&
    formData[jenis_pomdam.source] === 2;

  const initialValues = {
    created: created,
    updated: created
  };

  return (
    <Create {...props} {...create} record={{ komandan: personel }}>
      <SimpleForm
        variant="outlined"
        toolbar={<PenyelenggaraCreateToolbar />}
        initialValues={initialValues}
      >
        <ReferenceInput {...lingkup}>
          <SelectInput optionText={lingkup_src.fields.nama.source} />
        </ReferenceInput>
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            isPomdam(formData) && (
              <ReferenceInput {...jenis_pomdam} {...rest}>
                <SelectInput optionText={jenis_pomdam_src.fields.nama.source} />
              </ReferenceInput>
            )
          }
        </FormDataConsumer>
        <TextInput {...nama} />
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            isUmum(formData) && <TextInput {...kode_romawi} {...rest} />
          }
        </FormDataConsumer>

        <TextInput {...kode} />
        <TextInput {...markas} />
        <PersonelForm
          prefix="komandan"
          setPersonel={setPersonel}
          personel={personel}
        />
      </SimpleForm>
    </Create>
  );
};

export default PenyelenggaraCreate;
