import axios from "axios";
import React, { useState } from "react";
import Input from "./Input";

const TrainingRegistrationForm = props => {
  const [trainingName, setTrainingName] = useState("");
  const [trainingVelocity, setTrainingVelocity] = useState(0);
  const [trainingUnit, setTrainingUnit] = useState("");

  const handleSubmit = (e) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/training`, {
        name: trainingName,
        velocity: trainingVelocity,
        unit: trainingUnit,
      })
      .then((res) => {
        if (res.status !== 200) return;
        props.getIndexData();
      });
    props.setAlert({
      active: true,
      message: (
        <React.Fragment>
          <p>新しい鍛錬：{trainingName}を登録しました！</p>
        </React.Fragment>
      )
    });
    setTimeout(() => {props.setAlert({ active: false })}, 5000);
    e.preventDefault();
  };

  const setTrainingProperties = {
    trainingName: (value) => setTrainingName(value),
    trainingVelocity: (value) => setTrainingVelocity(value),
    trainingUnit: (value) => setTrainingUnit(value),
  };
  
  const handleChange = (e) => {
    setTrainingProperties[e.target.name](e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type={"text"}
        name={"trainingName"}
        value={trainingName}
        onChange={handleChange}
      />
      <br />
      <Input
        type={"number"}
        name={"trainingVelocity"}
        value={trainingVelocity}
        onChange={handleChange}
      />
      <br />
      <Input
        type={"text"}
        name={"trainingUnit"}
        value={trainingUnit}
        onChange={handleChange}
      />
      <br />
      <input type="submit" value="登録" />
    </form>
  );
};

export default TrainingRegistrationForm;
