import React, { useState } from "react";
import { Create, SimpleForm, ReferenceInput, SelectInput } from "react-admin";
import moment from "moment";
import pengguna from "..";
import SimCreateToolbar from "./helpers/SimCreateToolbar";
import PersonelForm from "../../personel/components/PersonelForm";
import jenis_pengajuan_sim_src from "../../jenis_pengajuan_sim";
import gol_sim_src from "../../gol_sim";

const created = moment();

const SimCreate = ({ permissions, ...props }) => {
  const {
    components: { create },
    fields: { jenis_pengajuan_sim, gol_sim }
  } = pengguna;
  const [personel, setPersonel] = useState();

  const initialValues = {
    created: created,
    berlaku_hingga: moment(created).add(5, "y"),
    updated: created,
    penyelenggara_id: permissions ? permissions.penyelenggara_id : null
  };

  return permissions ? (
    <Create {...props} {...create} record={{ personel: personel }}>
      <SimpleForm
        variant="outlined"
        toolbar={<SimCreateToolbar />}
        initialValues={initialValues}
      >
        <ReferenceInput {...jenis_pengajuan_sim}>
          <SelectInput
            optionText={jenis_pengajuan_sim_src.fields.nama.source}
          />
        </ReferenceInput>
        <ReferenceInput {...gol_sim}>
          <SelectInput optionText={gol_sim_src.fields.nama.source} />
        </ReferenceInput>
        <PersonelForm
          prefix="personel"
          setPersonel={setPersonel}
          personel={personel}
        />
      </SimpleForm>
    </Create>
  ) : null;
};

export default SimCreate;
