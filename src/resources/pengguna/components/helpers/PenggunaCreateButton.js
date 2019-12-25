import React, { useCallback } from "react";
import { useForm } from "react-final-form";
import { SaveButton, useDataProvider } from "react-admin";
import pengguna from "../..";
import personel_src from "../../../personel";

const PenggunaCreateButton = ({ handleSubmitWithRedirect, ...props }) => {
  const form = useForm();
  const dataProvider = useDataProvider();

  const handleClick = useCallback(() => {
    const { personel, personel_id, ...rest } = form.getState().values;

    if (personel_id) {
      dataProvider
        .update(personel_src.identities.name, {
          id: personel_id,
          data: { ...personel }
        })
        .then(({ data: res }) => {
          dataProvider
            .create(pengguna.identities.name, {
              data: { ...rest, personel_id: res.id }
            })
            .then(res => {
              console.log(res);
            });
        });
    } else {
      dataProvider
        .create(personel_src.identities.name, {
          data: { ...personel }
        })
        .then(({ data: res }) => {
          dataProvider
            .create(pengguna.identities.name, {
              data: { ...rest, personel_id: res.id }
            })
            .then(res => {
              console.log(res);
            });
        });
    }
  }, [form, dataProvider]);

  return <SaveButton {...props} handleSubmitWithRedirect={handleClick} />;
};

export default PenggunaCreateButton;
