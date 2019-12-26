import React, { Component } from "react";
import { Stage, Layer, Rect, Text, Group, Image } from "react-konva";
import JsBarcode from "jsbarcode";
import { Button } from "@material-ui/core";

const NoSim = ({ x, y, content }) => (
  <Group x={x} y={y}>
    <Text
      x={85}
      text={content}
      fontSize={9}
      fontStyle="bold"
      fontFamily="Roboto"
    />
  </Group>
);

const Nama = ({ y, content }) => (
  <Group y={y}>
    <Text text="Nama" fontSize={9} fontFamily="Roboto" fontStyle="bold" />
    <Text x={85} text=":" fontSize={9} fontFamily="Roboto" fontStyle="bold" />
    <Text
      x={90}
      text={content}
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
  </Group>
);

const TempatTanggalLahir = ({ y, content }) => (
  <Group y={y}>
    <Text
      text="Tempat/Tgl. Lahir"
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
    <Text x={85} text=":" fontSize={9} fontFamily="Roboto" fontStyle="bold" />
    <Text
      x={90}
      text={content}
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
  </Group>
);

const PangkatKorpsNrpNip = ({ y, content }) => (
  <Group y={y}>
    <Text
      text="Pangkat/NRP/NIP"
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
    <Text x={85} text=":" fontSize={9} fontFamily="Roboto" fontStyle="bold" />
    <Text
      x={90}
      text={content}
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
  </Group>
);

const Kesatuan = ({ y, content }) => (
  <Group y={y}>
    <Text text="Kesatuan" fontSize={9} fontFamily="Roboto" fontStyle="bold" />
    <Text x={85} text=":" fontSize={9} fontFamily="Roboto" fontStyle="bold" />
    <Text
      x={90}
      text={content}
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
  </Group>
);

const GolonganDarah = ({ y, content }) => (
  <Group y={y}>
    <Text
      text="Golongan darah"
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
    <Text x={85} text=":" fontSize={9} fontFamily="Roboto" fontStyle="bold" />
    <Text
      x={90}
      text={content}
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
  </Group>
);

const DiberikanDi = ({ y, content }) => (
  <Group y={y}>
    <Text
      text="Diberikan di"
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
    <Text x={70} text=":" fontSize={9} fontFamily="Roboto" fontStyle="bold" />
    <Text
      x={75}
      text={content}
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
  </Group>
);

const PadaTanggal = ({ y, content }) => (
  <Group y={y}>
    <Text
      text="Pada tanggal"
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
    <Text x={70} text=":" fontSize={9} fontFamily="Roboto" fontStyle="bold" />
    <Text
      x={75}
      text={content}
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
  </Group>
);

const BerlakuHingga = ({ y, content }) => (
  <Group y={y}>
    <Text
      text="Berlaku hingga"
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
    <Text x={70} text=":" fontSize={9} fontFamily="Roboto" fontStyle="bold" />
    <Text
      x={75}
      text={content}
      fontSize={9}
      fontFamily="Roboto"
      fontStyle="bold"
    />
  </Group>
);

const LabelKomandan = ({ y, content }) => (
  <Group y={y}>
    <Text text={content} fontSize={9} fontFamily="Roboto" fontStyle="bold" />
  </Group>
);

const NamaKomandan = ({ y, content }) => (
  <Group y={y}>
    <Text text={content} fontSize={9} fontFamily="Roboto" fontStyle="bold" />
  </Group>
);

const PangkatKorpsNrpKomandan = ({ y, content }) => (
  <Group y={y}>
    <Text text={content} fontSize={9} fontFamily="Roboto" fontStyle="bold" />
  </Group>
);

const DataPribadi = ({
  x,
  y,
  nama,
  tempat_tanggal_lahir,
  pangkat_korps_no_identitas,
  kesatuan,
  golongan_darah
}) => (
  <Group x={x} y={y}>
    <Nama y={0} content={nama}></Nama>
    <TempatTanggalLahir y={10} content={tempat_tanggal_lahir} />
    <PangkatKorpsNrpNip y={20} content={pangkat_korps_no_identitas} />
    <Kesatuan y={30} content={kesatuan} />
    <GolonganDarah y={40} content={golongan_darah} />
  </Group>
);

const KeteranganSim = ({
  x,
  y,
  diberikan_di,
  pada_tanggal,
  berlaku_hingga
}) => (
  <Group x={x} y={y}>
    <DiberikanDi y={0} content={diberikan_di} />
    <PadaTanggal y={10} content={pada_tanggal} />
    <BerlakuHingga y={20} content={berlaku_hingga} />
  </Group>
);

const Komandan = ({
  x,
  y,
  label_komandan,
  nama_komandan,
  pangkat_korps_no_identitas_komandan
}) => (
  <Group x={x} y={y}>
    <LabelKomandan y={0} content={label_komandan} />
    <NamaKomandan y={40} content={nama_komandan} />
    <PangkatKorpsNrpKomandan
      y={50}
      content={pangkat_korps_no_identitas_komandan}
    />
  </Group>
);

class SimCanvas extends Component {
  state = {};

  componentDidMount = () => {
    const { sim_id } = this.props;

    this.loadBarcode(sim_id);
    this.loadSignature();
    this.loadSidikJari();
    this.loadPasFoto();
    this.loadTandaTanganKomandan();
    this.loadStempel();
  };

  loadStempel = () => {
    const { stempel } = this.props;
    this.stempel = new window.Image();
    this.stempel.src = stempel;

    this.stempel.addEventListener("load", this.handleLoadStempel);
  };

  handleLoadStempel = () => {
    this.setState({
      stempel: this.stempel
    });
  };

  loadTandaTanganKomandan = () => {
    const { tanda_tangan_komandan } = this.props;
    this.tanda_tangan_komandan = new window.Image();
    this.tanda_tangan_komandan.src = tanda_tangan_komandan;

    this.tanda_tangan_komandan.addEventListener(
      "load",
      this.handleLoadTandaTanganKomandan
    );
  };

  handleLoadTandaTanganKomandan = () => {
    this.setState({
      tanda_tangan_komandan: this.tanda_tangan_komandan
    });
  };

  loadPasFoto = () => {
    const { pas_foto } = this.props;
    this.pas_foto = new window.Image();
    this.pas_foto.src = pas_foto;

    this.pas_foto.addEventListener("load", this.handleLoadPasFoto);
  };

  handleLoadPasFoto = () => {
    this.setState({
      pas_foto: this.pas_foto
    });
  };

  loadBarcode = no_urut_sim => {
    this.barcode = new window.Image();

    JsBarcode(this.barcode, no_urut_sim, {
      background: "transparent",
      displayValue: false
    });

    this.barcode.addEventListener("load", this.handleLoadBarcode);
  };

  handleLoadBarcode = () => {
    this.setState({
      barcode: this.barcode
    });
  };

  loadSignature = () => {
    const { tanda_tangan } = this.props;

    this.signature = new window.Image();
    this.signature.src = tanda_tangan;

    this.signature.addEventListener("load", this.handleLoadSignature);
  };

  handleLoadSignature = () => {
    this.setState({
      signature: this.signature
    });
  };

  loadSidikJari = () => {
    const { sidik_jari } = this.props;
    this.sidik_jari = new window.Image();
    this.sidik_jari.src = sidik_jari;

    this.sidik_jari.addEventListener("load", this.handleLoadSidikJari);
  };

  handleLoadSidikJari = () => {
    this.setState({
      sidik_jari: this.sidik_jari
    });
  };

  simpan = () => {
    const image = this.stageRef.toDataURL({
      mimeType: "image/png",
      width: 325,
      height: 204,
      quality: 2,
      pixelRatio: 5
    });

    this.setState({ image });
  };

  render() {
    const {
      no_sim,
      nama,
      tempat_tanggal_lahir,
      pangkat_korps_no_identitas,
      kesatuan,
      gol_darah,
      diberikan_di,
      pada_tanggal,
      berlaku_hingga,
      label_komandan,
      nama_komandan,
      pangkat_korps_no_identitas_komandan
    } = this.props;

    return (
      <div>
        <img src={this.state.image} width={325} height={204}></img>
        <Stage width={325} height={204} ref={ref => (this.stageRef = ref)}>
          <Layer>
            {/* <Rect
              x={0}
              y={0}
              width={325}
              height={204}
              shadowBlur={5}
              fill="blue"
            /> */}
            <NoSim x={55} y={38} content={no_sim} />
            <DataPribadi
              x={10}
              y={55}
              nama={nama}
              tempat_tanggal_lahir={tempat_tanggal_lahir}
              pangkat_korps_no_identitas={pangkat_korps_no_identitas}
              kesatuan={kesatuan}
              golongan_darah={gol_darah}
            />
            <KeteranganSim
              x={170}
              y={107}
              diberikan_di={diberikan_di}
              pada_tanggal={pada_tanggal}
              berlaku_hingga={berlaku_hingga}
            />
            <Komandan
              x={230}
              y={140}
              label_komandan={label_komandan}
              nama_komandan={nama_komandan}
              pangkat_korps_no_identitas_komandan={
                pangkat_korps_no_identitas_komandan
              }
            />
            <Image
              x={88}
              y={107}
              image={this.state.pas_foto}
              width={75}
              height={90}
            ></Image>
            <Image
              x={160}
              y={147}
              image={this.state.tanda_tangan_komandan}
              width={200}
              height={40}
            ></Image>
            <Image
              x={175}
              y={135}
              image={this.state.stempel}
              width={60}
              height={60}
            ></Image>
            <Image
              x={10}
              y={177}
              width={70}
              height={20}
              image={this.state.barcode}
            ></Image>
            <Image
              x={10}
              y={105}
              image={this.state.sidik_jari}
              width={35}
              height={40}
            ></Image>
            <Image
              x={-65}
              y={135}
              width={200}
              height={40}
              image={this.state.signature}
            ></Image>
          </Layer>
        </Stage>

        <Button onClick={this.simpan}>Simpan</Button>
      </div>
    );
  }
}

export default SimCanvas;
