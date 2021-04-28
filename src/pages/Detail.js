import axios from "axios";
import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import * as dayjs from 'dayjs';
import './Calendar.css';

const extractTrainingId = (pathname) => {
  return pathname.split("/")[2];
};

const Detail = props => {
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

  if (props.checkAuthentication()) {
    return (
      <div>
        <h1 className="title is-1 has-text-centered">
          {training.name} {training.velocity} {training.unit}
        </h1>
        <div>
          <h2 className="subtitle is-4 has-text-centered mt-6 japanese">これまでの達成</h2>
          <p className="title is-1 has-text-centered">
            {totalVelocity} {training.unit}
          </p>
        </div>
        <div>
          <h2 className="subtitle is-4 has-text-centered mt-6 japanese">達成カレンダー</h2>
          <div className="is-flex is-flex-direction-column is-align-items-center">
            <Calendar
              tileClassName={({date}) => {
                return achievementDates.includes(dayjs(date).format('YYYY-MM-DD')) ? "has-text-white has-background-primary" : "";
              }}
              className="box"
              onActiveStartDateChange={({ activeStartDate }) => {
                const year = activeStartDate.getFullYear();
                const rawMonth = activeStartDate.getMonth() + 1;
                const month = rawMonth < 10 ? `0${rawMonth}` : rawMonth.toString();
                axios
                  .get(
                    `${process.env.REACT_APP_BACKEND_URL}/training/${extractTrainingId(
                      props.location.pathname
                    )}?year=${year}&month=${month}`
                  )
                  .then((res) => {
                    setTraining(res.data.training);
                    setTotalVelocity(res.data.totalVelocity);
                    setAchievementDates(res.data.achievements);
                  });
              }}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Not authenticated yet</p>
        <p>下のボタンからログインしてください</p>
        <a href="https://netero.jp.auth0.com/authorize?response_type=token&client_id=PStSWdvj7dggxO2TAOWtV2bjC8nwi5dl&redirect_uri=http://localhost:3000&nonce=safsaf&audience=https://netero-implicit-auth.jp">sadfsdaf</a>
      </div>
    )
  }
};

export default Detail;
