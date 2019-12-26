import React, { useState } from "react";
import {
  Edit,
  TabbedForm,
  ReferenceInput,
  SelectInput,
  ImageInput,
  ImageField,
  FormTab
} from "react-admin";
import moment from "moment";
import SimCreateToolbar from "./helpers/SimCreateToolbar";
import PersonelForm from "../../personel/components/PersonelForm";
import jenis_pengajuan_sim_src from "../../jenis_pengajuan_sim";
import gol_sim_src from "../../gol_sim";
import CameraInput from "../../../helpers/input/CameraInput";
import SignaturePadInput from "../../../helpers/input/SignaturePadInput";
import sim from "..";

const created = moment();

const SimEdit = ({ permissions, ...props }) => {
  const {
    components: { create },
    fields: { jenis_pengajuan_sim, gol_sim }
  } = sim;

  const [personel, setPersonel] = useState();

  const initialValues = {
    created: created,
    berlaku_hingga: moment(created).add(5, "y"),
    updated: created,
    penyelenggara_id: permissions ? permissions.penyelenggara_id : null
  };

  return permissions ? (
    <Edit {...props} {...create} record={{ personel: personel }}>
      <TabbedForm
        variant="outlined"
        toolbar={<SimCreateToolbar />}
        initialValues={initialValues}
      >
        <FormTab label="Keterangan">
          <ReferenceInput {...jenis_pengajuan_sim}>
            <SelectInput
              optionText={jenis_pengajuan_sim_src.fields.nama.source}
            />
          </ReferenceInput>
          <ReferenceInput {...gol_sim}>
            <SelectInput optionText={gol_sim_src.fields.nama.source} />
          </ReferenceInput>
        </FormTab>
        <FormTab label="Personel">
          <PersonelForm
            prefix="personel"
            setPersonel={setPersonel}
            personel={personel}
          />
        </FormTab>
        <FormTab label="Pas Foto">
          <CameraInput></CameraInput>
        </FormTab>
        <FormTab label="Tanda Tangan">
          <SignaturePadInput></SignaturePadInput>
        </FormTab>
        <FormTab label="Sidik Jari">
          <ImageInput
            source="sidik_jari"
            label="Sidik Jari"
            accept="image/*"
            multiple={false}
            placeholder={<p>Pilih Sidik Jari</p>}
          >
            <ImageField source="src" title="title" />
          </ImageInput>
        </FormTab>
      </TabbedForm>
    </Edit>
  ) : null;
};

export default SimEdit;
