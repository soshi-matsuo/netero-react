import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TrainingRegistrationForm from "../components/TrainingRegistrationForm";
import Alert from "../components/Alert";
import Login from "../components/Login";
import {get, post} from "../context/axiosTemplate";

const Index = (props) => {
  const [trainings, setTrainings] = useState([]);
  const [achievedSet, setAchievedSet] = useState(new Set());
  const [alert, setAlert] = useState({ active: false, message: '', status: '' });

  const getIndexData = () => {
    get('/index').then((res) => {
      setTrainings(res.data.trainings);
      setAchievedSet(new Set(res.data.achievedIds));
    });
  };

  useEffect(getIndexData, []);

  const handleClick = (e, trainingId, trainingName) => {
    post(`/achievement/${trainingId}`)
      .then((res) => {
        if (res.status !== 200) return;
        getIndexData();
      });
    setAlert({
      active: true,
      message: (
        <React.Fragment>
          <p>今日の{trainingName}を達成しました！</p>
          <p><Link to={`/detail/${trainingId}`}>詳細ページ</Link>でこれまでの達成を確認しよう！</p>
        </React.Fragment>
      ),
      status: 'is-success',
    });
    e.preventDefault();
  };

  const deleteAlert = () => setAlert({ active: false, message: '' });

  if (!props.checkAuthentication()) return <Login/>

  return (
    <div className="columns">
      <div className="column is-three-fifths is-offset-one-fifth">
        <p className="title is-3 is-size-5-mobile is-spaced has-text-centered japanese">今日の鍛錬</p>
        {alert.active ? <Alert message={alert.message} onDelete={deleteAlert} status={alert.status} /> : null}
        <div className="box has-background-light">
          <ul style={{ overflow: 'scroll', height: '30vh' }}>
            {trainings.map((tr) => (
              <li key={tr.id} className="box content py-3">
                <div className="columns is-vcentered is-mobile">
                  <div className="column is-10-tablet is-9-mobile pl-5">
                    <Link to={`/detail/${tr.id}`} className="is-size-4 is-size-6-mobile has-text-weight-bold">
                      {tr.name} {tr.velocity} {tr.unit}&nbsp;
                    </Link>
                  </div>
                  <div className="column is-2-tablet is-3-mobile is-flex is-flex-direction-column is-align-items-center">
                    {achievedSet.has(tr.id) ? (
                      <button className="button is-primary is-inverted" style={{ width: "60px" }} disabled>
                        <span className="is-size-3">✅</span>
                      </button>
                    ) : (
                      <button onClick={(e) => handleClick(e, tr.id, tr.name)} className="button japanese" style={{ width: "60px" }}>達成</button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="title is-3 is-size-5-mobile is-spaced has-text-centered mt-6 japanese">新しく鍛錬を登録する</p>
        <TrainingRegistrationForm getIndexData={getIndexData} setAlert={setAlert} />
        <button type="button" className="button japanese" onClick={() => {
          document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          window.location.replace('');
        }}>ログアウトする</button>
      </div>
    </div>
  );
};

export default Index;
