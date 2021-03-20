import axios from "axios";
import React from "react";

const extractTrainingId = (pathname) => {
    return pathname.split("/")[2];
}

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            training: {},
            totalVelocity: 0,
            achievementDates: [],
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/training/${extractTrainingId(this.props.location.pathname)}`).then((res) => {
            this.setState({
                training: res.data.training,
                totalVelocity: res.data.totalVelocity,
                achievementDates: res.data.achievements,
            });
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.training.name} {this.state.training.velocity} {this.state.training.unit}</h1>
                <div>
                    <h2>これまでの達成</h2>
                    <p>{this.state.totalVelocity} {this.state.training.unit}</p>
                </div>
                <div>
                    <h2>達成カレンダー</h2>
                    <p>{this.state.achievementDates}</p>
                </div>
            </div>
        )
    }
};

export default Detail;