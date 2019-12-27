import React, { useState } from "react";
import {
  Create,
  TabbedForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  FormDataConsumer,
  ImageInput,
  ImageField,
  FormTab,
  AutocompleteInput
} from "react-admin";
import moment from "moment";
import penyelenggara from "..";
import ibukota_provinsi_src from "../../ibukota_provinsi";
import lingkup_src from "../../lingkup";
import jenis_pomdam_src from "../../jenis_pomdam";
import PersonelForm from "../../personel/components/PersonelForm";
import PenyelenggaraCreateToolbar from "./helpers/PenyelenggaraCreateToolbar";
import SignaturePadInput from "../../../helpers/input/SignaturePadInput";

const created = moment();

const PenyelenggaraCreate = ({ permissions, ...props }) => {
  const {
    components: { create },
    fields: { lingkup, jenis_pomdam, nama, kode_romawi, kode, markas, stempel },
    prefix
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
      <TabbedForm
        variant="outlined"
        toolbar={<PenyelenggaraCreateToolbar />}
        initialValues={initialValues}
      >
        <FormTab label="Keterangan">
          <ReferenceInput {...lingkup}>
            <SelectInput optionText={lingkup_src.fields.nama.source} />
          </ReferenceInput>
          <FormDataConsumer>
            {({ formData, ...rest }) =>
              isPomdam(formData) && (
                <ReferenceInput {...jenis_pomdam} {...rest}>
                  <SelectInput
                    optionText={jenis_pomdam_src.fields.nama.source}
                  />
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
          <ReferenceInput {...markas}>
            <AutocompleteInput
              optionText={ibukota_provinsi_src.fields.nama.source}
            />
          </ReferenceInput>
        </FormTab>
        <FormTab label="Komandan">
          <PersonelForm
            prefix={prefix}
            setPersonel={setPersonel}
            personel={personel}
          />
        </FormTab>
        <FormTab label="Tanda Tangan Komandan">
          <SignaturePadInput />
        </FormTab>
        <FormTab label="Stempel">
          <ImageInput {...stempel}>
            <ImageField source="src" title="Stempel penyelenggara" />
          </ImageInput>
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default PenyelenggaraCreate;
