import axios from "axios";
import React, { useState, useEffect } from "react";
import TrainingRegistrationForm from "../components/TrainingRegistrationForm";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";

const Index = () => {
  const [trainings, setTrainings] = useState([]);
  const [achievedSet, setAchievedSet] = useState(new Set());
  const [alert, setAlert] = useState({ active: false, message: ''});

  const getIndexData = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/index`).then((res) => {
      setTrainings(res.data.trainings);
      setAchievedSet(new Set(res.data.achievedIds));
    });
  };

  useEffect(getIndexData, []);

  const handleClick = (e, trainingId, trainingName) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/achievement/${trainingId}`)
      .then((res) => {
        if (res.status !== 200) return;
        getIndexData();
      });
    setAlert({
      active: true,
      message: (
        <React.Fragment>
          <p>今日の{trainingName}を達成しました！</p>
          <p><Link to={`/detail/${trainingId}`}>詳細ページ</Link>でこれまでの達成を確認してみよう！</p>
        </React.Fragment>
      )
    });
    setTimeout(() => {setAlert({ active: false })}, 5000);
    e.preventDefault();
  };

  return (
    <div>
      <p>Welcome to Netero</p>
      {alert.active ? <Alert message={alert.message} /> : null}
      <ul>
        {trainings.map((tr) => (
          <li key={tr.id}>
            <Link to={`/detail/${tr.id}`}>
              {tr.name} {tr.velocity} {tr.unit}&nbsp;
            </Link>
            {achievedSet.has(tr.id) ? (
              <span>✅</span>
            ) : (
              <button onClick={(e) => handleClick(e, tr.id, tr.name)}>達成</button>
            )}
          </li>
        ))}
      </ul>
      <TrainingRegistrationForm getIndexData={getIndexData} setAlert={setAlert}/>
      <button type="button">ログアウトする</button>
    </div>
  );
};

export default Index;
