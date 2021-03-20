import axios from "axios";
import React from 'react';
import TrainingRegistrationForm from "../components/TrainingRegistrationForm";
import { Link } from "react-router-dom";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainings: [],
      achievedSet: new Set(),
    };
  }

  getIndexData() {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/index`).then((res) => {
      this.setState({
        trainings: res.data.trainings,
        achievedSet: new Set(res.data.achievedIds),
      });
    });
  }

  componentDidMount() {
    this.getIndexData();
  }

  handleClick(e, trainingId) {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/achievement/${trainingId}`)
      .then((res) => {
        if (res.status !== 200) return;
        this.getIndexData();
      });
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>NETERO</h1>
        <p>Welcome to Netero</p>
        <ul>
          {this.state.trainings.map((tr) => (
            <li key={tr.id}>
              <Link to={`/detail/${tr.id}`}>
                {tr.name} {tr.velocity} {tr.unit}&nbsp;
              </Link>
              {this.state.achievedSet.has(tr.id) ? (
                <span>✅</span>
              ) : (
                <button onClick={(e) => this.handleClick(e, tr.id)}>達成</button>
              )}
            </li>
          ))}
        </ul>
        <TrainingRegistrationForm getIndexData={this.getIndexData.bind(this)} />
        <button type="button">ログアウトする</button>
      </div>
    );
  }
}

export default Index;
