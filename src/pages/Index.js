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
    <div className="columns">
      <div className="column is-three-fifths is-offset-one-fifth">
        <p className="title is-1 is-size-3-mobile is-spaced has-text-centered">Welcome to Netero</p>
        <p className="subtitle is-3 is-size-5-mobile is-spaced has-text-centered">今日の鍛錬</p>
        {alert.active ? <Alert message={alert.message} /> : null}
        <ul>
          {trainings.map((tr) => (
            <li key={tr.id} className="box content">
              <Link to={`/detail/${tr.id}`}>
                {tr.name} {tr.velocity} {tr.unit}&nbsp;
              </Link>
              {achievedSet.has(tr.id) ? (
                <span>✅</span>
              ) : (
                <button onClick={(e) => handleClick(e, tr.id, tr.name)} className="button">達成</button>
              )}
            </li>
          ))}
        </ul>
        <p className="subtitle is-3 is-size-5-mobile is-spaced has-text-centered mt-6">新しく鍛錬を登録する</p>
        <TrainingRegistrationForm getIndexData={getIndexData} setAlert={setAlert}/>
        <button type="button" className="button">ログアウトする</button>
      </div>
    </div>
  );
};

export default Index;
