import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Detail from "./pages/Detail";

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
      <Router>
        <Switch>
          <Route path="/detail/:id" exact component={Detail} />
          <Route path="/">
            <Index
              trainings={this.state.trainings}
              achievedSet={this.state.achievedSet}
              handleClick={this.handleClick.bind(this)}
              trainingName={this.state.trainingName}
              trainingVelocity={this.state.trainingVelocity}
              trainingUnit={this.state.trainingUnit}
              handleSubmit={this.handleSubmit.bind(this)}
              handleChange={this.handleChange.bind(this)}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
