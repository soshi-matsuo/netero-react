import axios from "axios";
import React, { useState } from "react";
import Input from "./Input";

const TrainingRegistrationForm = props => {
  const [trainingName, setTrainingName] = useState("");
  const [trainingVelocity, setTrainingVelocity] = useState("");
  const [trainingUnit, setTrainingUnit] = useState("");

  const handleSubmit = (e) => {
    // form validation
    if (!trainingName || !trainingVelocity || !trainingUnit) {
      props.setAlert({
        active: true,
        message: (
          <React.Fragment className="japanese">
            {!trainingName ? <p>鍛錬の名前を入力してください</p> : null}
            {!trainingVelocity ? <p>鍛錬の量を入力してください</p> : null}
            {!trainingUnit ? <p>鍛錬の単位を入力してください</p> : null}
          </React.Fragment>
        ),
        status: 'is-danger',
      });
      e.preventDefault();
      return;
    }

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
          <p className="japanese">新しい鍛錬：{trainingName}を登録しました！</p>
        </React.Fragment>
      ),
      status: 'is-success',
    });
    // clear input forms after submission
    setTrainingName('');
    setTrainingVelocity('');
    setTrainingUnit('');
    e.preventDefault();
  };

  const setTrainingProperties = {
    trainingName: (value) => setTrainingName(value),
    trainingVelocity: (value) => {
      const valNum = parseInt(value);
      if (isNaN(valNum)) {
        setTrainingVelocity("");
      } else {
        setTrainingVelocity(valNum);
      }
    },
    trainingUnit: (value) => setTrainingUnit(value),
  };
  
  const handleChange = (e) => {
    setTrainingProperties[e.target.name](e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="box py-5 has-background-light">
      <Input
        label={'鍛錬の名前'}
        placeholder={'読書、腕立て伏せ、散歩'}
        name={"trainingName"}
        value={trainingName}
        onChange={handleChange}
      />
      <Input
        label={'鍛錬の量'}
        placeholder={'1、10、30'}
        name={"trainingVelocity"}
        value={trainingVelocity}
        onChange={handleChange}
      />
      <Input
        label={'鍛錬の単位'}
        placeholder={'時間、回、分'}
        name={"trainingUnit"}
        value={trainingUnit}
        onChange={handleChange}
      />
      <input type="submit" value="登録" className="button japanese"/>
    </form>
  );
};

export default TrainingRegistrationForm;
