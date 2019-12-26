import React, { Fragment } from "react";
import {
  useDataProvider,
  ReferenceInput,
  SelectInput,
  NumberInput,
  TextInput,
  DateInput,
  FormDataConsumer
} from "react-admin";
import { useForm } from "react-final-form";
import jenis_personel_src from "../../jenis_personel";
import gol_darah_src from "../../gol_darah";
import pangkat_src from "../../pangkat";
import korps_src from "../../korps";
import personel_src from "../../personel";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  block: { display: "flex", width: 255 }
});

const PersonelForm = ({ fields, prefix, personel, setPersonel, ...rest }) => {
  const {
    id: personel_id,
    jenis_personel,
    no_identitas,
    nama,
    tempat_lahir,
    tanggal_lahir,
    gol_darah,
    pangkat,
    korps,
    kesatuan
  } = personel_src.fields(prefix);
  const classes = useStyles();
  const form = useForm();
  const dataProvider = useDataProvider();

  const handleJenisPersonelIdOnChange = () => {
    if (personel) {
      form.change(personel_id.source, undefined);
      form.change(no_identitas.source, undefined);
      form.change(nama.source, undefined);
      form.change(tempat_lahir.source, undefined);
      form.change(tanggal_lahir.source, undefined);
      form.change(gol_darah.source, undefined);
      form.change(pangkat.source, undefined);
      form.change(korps.source, undefined);
      form.change(kesatuan.source, undefined);
    }
  };

  const handleNoIdentitasChange = e => {
    const value = e.target.value;
    const jenis_personel_id = form.getFieldState(jenis_personel.source).value;

    if (value && jenis_personel_id) {
      dataProvider
        .getList(personel_src.identities.name, {
          pagination: { page: 1, perPage: 1 },
          sort: { field: personel_id.source, order: "ASC" },
          filter: { jenis_personel_id: jenis_personel_id, no_identitas: value }
        })
        .then(({ data: res }) => {
          if (res[0]) {
            const { id, jenis_personel_id, no_identitas, ...rest } = res[0];

            form.change(prefix + "_id", id);
            setPersonel(rest);
          } else {
            form.change(prefix + "_id", null);
            setPersonel(null);
          }
        });
    } else {
      form.change(prefix + "_id", null);
      setPersonel(null);
    }
  };

  const isAnggotaTniAd = formData =>
    formData[prefix] &&
    formData[prefix].jenis_personel_id &&
    formData[prefix].jenis_personel_id === 1;

  const isJenisPersonelSelected = formData =>
    formData[prefix] && formData[prefix].jenis_personel_id;

  return (
    <Fragment>
      <ReferenceInput
        {...jenis_personel}
        {...rest}
        onChange={handleJenisPersonelIdOnChange}
        className={classes.block}
      >
        <SelectInput optionText={jenis_personel_src.fields.nama.source} />
      </ReferenceInput>
      <FormDataConsumer {...rest}>
        {({ formData, ...formDataRest }) =>
          isJenisPersonelSelected(formData) && (
            <NumberInput
              {...no_identitas}
              {...formDataRest}
              onChange={handleNoIdentitasChange}
              className={classes.block}
            />
          )
        }
      </FormDataConsumer>

      <TextInput {...nama} {...rest} className={classes.block} />
      <TextInput {...tempat_lahir} {...rest} className={classes.block} />
      <DateInput {...tanggal_lahir} {...rest} className={classes.block} />
      <ReferenceInput {...gol_darah} {...rest} className={classes.block}>
        <SelectInput optionText={gol_darah_src.fields.nama.source} />
      </ReferenceInput>
      <FormDataConsumer {...rest}>
        {({ formData, ...formDataRest }) =>
          isAnggotaTniAd(formData) && (
            <ReferenceInput
              {...pangkat}
              {...formDataRest}
              className={classes.block}
            >
              <SelectInput optionText={pangkat_src.fields.nama.source} />
            </ReferenceInput>
          )
        }
      </FormDataConsumer>
      <FormDataConsumer {...rest}>
        {({ formData, ...formDataRest }) =>
          isAnggotaTniAd(formData) && (
            <ReferenceInput
              {...korps}
              {...formDataRest}
              className={classes.block}
            >
              <SelectInput optionText={korps_src.fields.nama.source} />
            </ReferenceInput>
          )
        }
      </FormDataConsumer>
      <FormDataConsumer {...rest}>
        {({ formData, ...formDataRest }) =>
          isAnggotaTniAd(formData) && (
            <TextInput
              {...kesatuan}
              {...formDataRest}
              className={classes.block}
            />
          )
        }
      </FormDataConsumer>
    </Fragment>
  );
};

export default PersonelForm;
