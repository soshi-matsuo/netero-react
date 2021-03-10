import axios from "axios";
import React from "react";
import TrainingRegistrationForm from "./components/TrainingRegistrationForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainings: [],
      achievedSet: new Set(),
      trainingName: "",
      trainingVelocity: 0,
      trainingUnit: "",
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

  handleSubmit(e) {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/training`, {
        name: this.state.trainingName,
        velocity: this.state.trainingVelocity,
        unit: this.state.trainingUnit,
      })
      .then((res) => {
        if (res.status !== 200) return;
        this.getIndexData();
      });
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClick(e, trainingId) {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/achievement/${trainingId}`)
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
              {tr.name} {tr.velocity} {tr.unit}&nbsp;
              {this.state.achievedSet.has(tr.id)
                ? <span>✅</span>
                : <button onClick={(e) => this.handleClick(e, tr.id)}>達成</button>
              }
            </li>
          ))}
        </ul>
        <TrainingRegistrationForm
          trainingName={this.state.trainingName}
          trainingVelocity={this.state.trainingVelocity}
          trainingUnit={this.state.trainingUnit}
          handleSubmit={this.handleSubmit.bind(this)}
          handleChange={this.handleChange.bind(this)}
        />
        <button type="button">ログアウトする</button>
      </div>
    );
  }
}

export default App;
