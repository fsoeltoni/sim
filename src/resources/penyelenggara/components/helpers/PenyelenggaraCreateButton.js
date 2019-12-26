import React, { useCallback } from "react";
import { useForm } from "react-final-form";
import { SaveButton, useDataProvider, useRedirect } from "react-admin";
import personel from "../../../personel";
import penyelenggara from "../..";

const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const PenyelenggaraCreateButton = ({ handleSubmitWithRedirect, ...props }) => {
  const form = useForm();
  const redirect = useRedirect();
  const dataProvider = useDataProvider();

  const handleClick = useCallback(() => {
    const { komandan, komandan_id, stempel, ...rest } = form.getState().values;

    if (komandan_id) {
      convertFileToBase64(stempel).then(stempel_res => {
        dataProvider
          .update(personel.identities.name, {
            id: komandan_id,
            data: { ...komandan }
          })
          .then(({ data: res }) => {
            dataProvider
              .create(penyelenggara.identities.name, {
                data: { ...rest, komandan_id: res.id, stempel: stempel_res }
              })
              .then(res => {
                redirect("/penyelenggara");
              });
          });
      });
    } else {
      convertFileToBase64(stempel).then(stempel_res => {
        dataProvider
          .create(personel.identities.name, {
            data: { ...komandan }
          })
          .then(({ data: res }) => {
            dataProvider
              .create(penyelenggara.identities.name, {
                data: { ...rest, komandan_id: res.id, stempel: stempel_res }
              })
              .then(res => {
                redirect("/penyelenggara");
              });
          });
      });
    }
  }, [form, dataProvider]);

  return <SaveButton {...props} handleSubmitWithRedirect={handleClick} />;
};

export default PenyelenggaraCreateButton;
