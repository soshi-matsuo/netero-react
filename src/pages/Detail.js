import axios from "axios";
import React, { useState, useEffect } from "react";

const extractTrainingId = (pathname) => {
  return pathname.split("/")[2];
};

const Detail = (props) => {
  const [training, setTraining] = useState({});
  const [totalVelocity, setTotalVelocity] = useState(0);
  const [achievementDates, setAchievementDates] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/training/${extractTrainingId(
          props.location.pathname
        )}`
      )
      .then((res) => {
        setTraining(res.data.training);
        setTotalVelocity(res.data.totalVelocity);
        setAchievementDates(res.data.achievements);
      });
  }, []);

  return (
    <div>
      <h1>
        {training.name} {training.velocity} {training.unit}
      </h1>
      <div>
        <h2>これまでの達成</h2>
        <p>
          {totalVelocity} {training.unit}
        </p>
      </div>
      <div>
        <h2>達成カレンダー</h2>
        <p>{JSON.stringify(achievementDates)}</p>
      </div>
    </div>
  );
};

export default Detail;
