import axios from "axios";
import React from "react";

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
        achievedSet: res.data.achievedSet,
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

  render() {
    return (
      <div>
        <h1>NETERO</h1>
        <p>Welcome to Netero</p>
        <ul>
          {this.state.trainings.map((tr) => (
            <li key={tr.id}>
              {tr.name} {tr.velocity} {tr.unit}
            </li>
          ))}
        </ul>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            name="trainingName"
            value={this.state.trainingName}
            onChange={this.handleChange.bind(this)}
          />
          <br />
          <input
            type="number"
            name="trainingVelocity"
            value={this.state.trainingVelocity}
            onChange={this.handleChange.bind(this)}
          />
          <br />
          <input
            type="text"
            name="trainingUnit"
            value={this.state.trainingUnit}
            onChange={this.handleChange.bind(this)}
          />
          <br />
          <input type="submit" value="登録" />
        </form>
        <button type="button">ログアウトする</button>
      </div>
    );
  }
}

export default App;
