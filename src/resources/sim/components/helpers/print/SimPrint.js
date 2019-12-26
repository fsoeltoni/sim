import React, { useState, useEffect, useRef } from "react";
import { Title, useDataProvider } from "react-admin";
import moment from "moment";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";
import monthToRoman from "./monthToRoman";
import SimCanvas from "./SimCanvas";
import ReactToPrint from "react-to-print";

const SimPrint = ({
  match: {
    params: { id }
  }
}) => {
  const dataProvider = useDataProvider();
  const componentRef = useRef();
  const [sim, setSim] = useState();
  const [jenis_pengajuan_sim, setPengajuanSim] = useState();
  const [gol_sim, setGolonganSim] = useState();
  const [penyelenggara, setPenyelenggara] = useState();
  const [markas, setMarkas] = useState();
  const [komandan, setKomandan] = useState();
  const [pangkat_komandan, setPangkatKomandan] = useState();
  const [korps_komandan, setKorpsKomandan] = useState();
  const [personel, setPersonel] = useState();
  const [gol_darah, setGolonganDarah] = useState();
  const [pangkat, setPangkat] = useState();
  const [korps, setKorps] = useState();

  useEffect(() => {
    dataProvider.getOne("sim", { id: id }).then(({ data }) => {
      dataProvider
        .getOne("jenis_pengajuan_sim", {
          id: data.jenis_pengajuan_sim_id
        })
        .then(({ data }) => setPengajuanSim(data));

      dataProvider
        .getOne("gol_sim", { id: data.gol_sim_id })
        .then(({ data }) => setGolonganSim(data));

      dataProvider
        .getOne("penyelenggara", { id: data.penyelenggara_id })
        .then(({ data }) => {
          dataProvider
            .getOne("personel", { id: data.komandan_id })
            .then(({ data }) => {
              dataProvider
                .getOne("pangkat", { id: data.pangkat_id })
                .then(({ data }) => setPangkatKomandan(data));

              dataProvider
                .getOne("korps", { id: data.korps_id })
                .then(({ data }) => setKorpsKomandan(data));

              setKomandan(data);
            });

          dataProvider
            .getOne("ibukota_provinsi", { id: data.markas_id })
            .then(({ data }) => setMarkas(data));

          setPenyelenggara(data);
        });

      dataProvider
        .getOne("personel", { id: data.personel_id })
        .then(({ data }) => {
          dataProvider
            .getOne("gol_darah", { id: data.gol_darah_id })
            .then(({ data }) => setGolonganDarah(data));

          dataProvider
            .getOne("pangkat", { id: data.pangkat_id })
            .then(({ data }) => setPangkat(data));

          dataProvider
            .getOne("korps", { id: data.korps_id })
            .then(({ data }) => setKorps(data));

          setPersonel(data);
        });

      setSim(data);
    });
  }, [dataProvider, id]);

  const display_sim_id = sim ? sim.id : null;
  const display_kode_sim_kode_sim_penyelenggara_kode = penyelenggara
    ? penyelenggara.kode
    : null;
  const display_kode_sim_no_urut_sim = sim
    ? "." + sim.id.toString().padStart(4, "0")
    : null;
  const display_kode_sim_tanggal_lahir = personel
    ? "." + moment(personel.tanggal_lahir).format("MMYY")
    : null;
  const display_kode_sim_gol_sim_nama = gol_sim ? "/" + gol_sim.nama : null;
  const display_kode_sim_jenis_pengajuan_sim_kode = jenis_pengajuan_sim
    ? "." + jenis_pengajuan_sim.kode
    : null;
  const display_kode_sim_tanggal_pembuatan_sim = sim
    ? "/" +
      monthToRoman(moment(sim.created).format("M")) +
      "/" +
      moment(sim.created).format("YYYY")
    : null;

  const display_kode_sim =
    display_kode_sim_kode_sim_penyelenggara_kode +
    display_kode_sim_no_urut_sim +
    display_kode_sim_tanggal_lahir +
    display_kode_sim_gol_sim_nama +
    display_kode_sim_jenis_pengajuan_sim_kode +
    display_kode_sim_tanggal_pembuatan_sim;

  const display_nama = personel ? personel.nama : "";
  const display_tempat_lahir = personel ? personel.tempat_lahir + "/" : "";
  const display_tanggal_lahir = personel
    ? moment(personel.tanggal_lahir).format("DD-MM-YYYY")
    : null;
  const display_tempat_tanggal_lahir =
    display_tempat_lahir + display_tanggal_lahir;
  const display_pangkat = pangkat ? pangkat.kode + " " : "";
  const display_korps = korps ? korps.kode + "/" : "";
  const display_no_identitas = personel ? personel.no_identitas : "";
  const display_pangkat_korps_no_identitas =
    display_pangkat + display_korps + +display_no_identitas;
  const display_kesatuan = personel ? personel.kesatuan : null;
  const display_gol_darah = gol_darah ? gol_darah.nama : null;
  const display_pas_foto = sim ? sim.pas_foto : null;
  const display_sidik_jari = sim
    ? sim.sidik_jari
      ? sim.sidik_jari.src
      : null
    : null;
  const display_tanda_tangan = sim ? sim.tanda_tangan : null;
  const display_diberikan_di = markas ? markas.nama : null;
  const display_pada_tanggal = sim
    ? moment(sim.created).format("DD-MM-YYYY")
    : null;
  const display_berlaku_hingga = sim
    ? moment(sim.berlaku_hingga).format("DD-MM-YYYY")
    : null;

  const display_label_komandan = () => {
    if (penyelenggara) {
      if (penyelenggara.lingkup_id === 1) {
        return "DANPUSPOMAD";
      }

      if (penyelenggara.lingkup_id === 2) {
        return (
          "DANPOMDAM " +
          (penyelenggara.kode_romawi ? penyelenggara.kode_romawi + "/" : "") +
          penyelenggara.kode
        );
      }
    }
  };

  const display_nama_komandan = komandan ? komandan.nama : "";
  const display_pangkat_komandan = pangkat_komandan
    ? pangkat_komandan.kode + " "
    : "";
  const display_korps_komandan = korps_komandan
    ? korps_komandan.kode + "/"
    : null;
  const display_no_identitas_komandan = komandan ? komandan.no_identitas : null;
  const display_pangkat_korps_no_identitas_komandan =
    display_pangkat_komandan +
    display_korps_komandan +
    display_no_identitas_komandan;
  const display_tanda_tangan_komandan = penyelenggara
    ? penyelenggara.tanda_tangan
    : null;

  const display_stempel = penyelenggara ? penyelenggara.stempel : null;

  return (
    <Card>
      <Title title="Cetak SIM" />
      <CardContent>
        {display_sim_id &&
          display_kode_sim &&
          display_nama &&
          display_tempat_tanggal_lahir &&
          display_gol_darah &&
          display_diberikan_di &&
          display_pada_tanggal &&
          display_berlaku_hingga &&
          display_label_komandan &&
          display_nama_komandan &&
          display_pangkat_korps_no_identitas_komandan && (
            <SimCanvas
              ref={componentRef}
              sim_id={display_sim_id}
              kode_sim={display_kode_sim}
              nama={display_nama}
              tempat_tanggal_lahir={display_tempat_tanggal_lahir}
              pangkat_korps_no_identitas={display_pangkat_korps_no_identitas}
              kesatuan={display_kesatuan}
              gol_darah={display_gol_darah}
              diberikan_di={display_diberikan_di}
              pada_tanggal={display_pada_tanggal}
              berlaku_hingga={display_berlaku_hingga}
              label_komandan={display_label_komandan()}
              nama_komandan={display_nama_komandan}
              pangkat_korps_no_identitas_komandan={
                display_pangkat_korps_no_identitas_komandan
              }
              pas_foto={display_pas_foto}
              tanda_tangan={display_tanda_tangan}
              tanda_tangan_komandan={display_tanda_tangan_komandan}
              sidik_jari={display_sidik_jari}
              stempel={display_stempel}
            />
          )}
      </CardContent>
      <CardActions>
        <ReactToPrint
          trigger={() => (
            <Button variant="contained" color="primary">
              Cetak
            </Button>
          )}
          content={() => componentRef.current}
        />
      </CardActions>
    </Card>
  );
};

export default SimPrint;
