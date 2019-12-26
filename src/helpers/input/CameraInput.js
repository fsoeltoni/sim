import React from "react";
import { Field } from "react-final-form";
import CameraComponent from "../components/CameraComponent";

const CameraInput = props => {
  console.log(props);

  return <Field name="pas_foto" component={CameraComponent} />;
};

export default CameraInput;
