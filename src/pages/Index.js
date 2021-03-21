import axios from "axios";
import React, { useState, useEffect } from "react";
import TrainingRegistrationForm from "../components/TrainingRegistrationForm";
import { Link } from "react-router-dom";

const Index = () => {
  const [trainings, setTrainings] = useState([]);
  const [achievedSet, setAchievedSet] = useState(new Set());

  const getIndexData = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/index`).then((res) => {
      setTrainings(res.data.trainings);
      setAchievedSet(new Set(res.data.achievedIds));
    });
  };

  useEffect(getIndexData, []);

  const handleClick = (e, trainingId) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/achievement/${trainingId}`)
      .then((res) => {
        if (res.status !== 200) return;
        getIndexData();
      });
    e.preventDefault();
  };

  return (
    <div>
      <h1>NETERO</h1>
      <p>Welcome to Netero</p>
      <ul>
        {trainings.map((tr) => (
          <li key={tr.id}>
            <Link to={`/detail/${tr.id}`}>
              {tr.name} {tr.velocity} {tr.unit}&nbsp;
            </Link>
            {achievedSet.has(tr.id) ? (
              <span>✅</span>
            ) : (
              <button onClick={(e) => handleClick(e, tr.id)}>達成</button>
            )}
          </li>
        ))}
      </ul>
      <TrainingRegistrationForm getIndexData={getIndexData} />
      <button type="button">ログアウトする</button>
    </div>
  );
};

export default Index;
