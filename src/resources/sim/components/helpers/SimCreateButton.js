import React, { useCallback } from "react";
import { useForm } from "react-final-form";
import { SaveButton, useDataProvider, useRedirect } from "react-admin";
import personel_src from "../../../personel";
import sim from "../..";

const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const SimCreateButton = ({ handleSubmitWithRedirect, ...props }) => {
  const form = useForm();
  const dataProvider = useDataProvider();
  const redirect = useRedirect();
  const { basePath } = props;

  const handleClick = useCallback(() => {
    const {
      personel,
      personel_id,
      sidik_jari,
      ...rest
    } = form.getState().values;

    if (personel_id) {
      convertFileToBase64(sidik_jari).then(sidik_jari_res => {
        dataProvider
          .update(personel_src.identities.name, {
            id: personel_id,
            data: { ...personel }
          })
          .then(({ data: res }) => {
            dataProvider
              .create(sim.identities.name, {
                data: {
                  ...rest,
                  personel_id: res.id,
                  sidik_jari: { src: sidik_jari_res }
                }
              })
              .then(({ data: res }) => {
                console.log(res);
                redirect(`${basePath}/print/${res.id}`);
              });
          });
      });
    } else {
      convertFileToBase64(sidik_jari).then(sidik_jari_res => {
        dataProvider
          .create(personel_src.identities.name, {
            data: { ...personel }
          })
          .then(({ data: res }) => {
            dataProvider
              .create(sim.identities.name, {
                data: {
                  ...rest,
                  personel_id: res.id,
                  sidik_jari: { src: sidik_jari_res }
                }
              })
              .then(({ data: res }) => {
                console.log(res);
                redirect(`${basePath}/print/${res.id}`);
              });
          });
      });
    }
  }, [form, dataProvider, basePath, redirect]);

  return <SaveButton {...props} handleSubmitWithRedirect={handleClick} />;
};

export default SimCreateButton;
