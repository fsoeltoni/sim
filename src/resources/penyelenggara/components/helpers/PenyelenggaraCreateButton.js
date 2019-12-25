import React, { useCallback } from "react";
import { useForm } from "react-final-form";
import { SaveButton, useDataProvider } from "react-admin";
import personel from "../../../personel";
import penyelenggara from "../..";

const PenyelenggaraCreateButton = ({ handleSubmitWithRedirect, ...props }) => {
  const form = useForm();
  const dataProvider = useDataProvider();

  const handleClick = useCallback(() => {
    const { komandan, komandan_id, ...rest } = form.getState().values;

    if (komandan_id) {
      dataProvider
        .update(personel.identities.name, {
          id: komandan_id,
          data: { ...komandan }
        })
        .then(({ data: res }) => {
          dataProvider
            .create(penyelenggara.identities.name, {
              data: { ...rest, komandan_id: res.id }
            })
            .then(res => {
              console.log(res);
            });
        });
    } else {
      dataProvider
        .create(personel.identities.name, {
          data: { ...komandan }
        })
        .then(({ data: res }) => {
          dataProvider
            .create(penyelenggara.identities.name, {
              data: { ...rest, komandan_id: res.id }
            })
            .then(res => {
              console.log(res);
            });
        });
    }
  }, [form, dataProvider]);

  return <SaveButton {...props} handleSubmitWithRedirect={handleClick} />;
};

export default PenyelenggaraCreateButton;
