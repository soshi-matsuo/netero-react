import axios from "axios";
import React from 'react';
import Input from './Input';

class TrainingRegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trainingName: "",
            trainingVelocity: 0,
            trainingUnit: "",
        };
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
                this.props.getIndexData();
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
            <form onSubmit={this.handleSubmit.bind(this)}>
                <Input
                    type={'text'}
                    name={'trainingName'}
                    value={this.state.trainingName}
                    onChange={this.handleChange.bind(this)}
                />
                <br />
                <Input
                    type={'number'}
                    name={'trainingVelocity'}
                    value={this.state.trainingVelocity}
                    onChange={this.handleChange.bind(this)}
                />
                <br />
                <Input
                    type={'text'}
                    name={'trainingUnit'}
                    value={this.state.trainingUnit}
                    onChange={this.handleChange.bind(this)}
                />
                <br />
                <input type="submit" value="登録" />
            </form>
        );
    }
}

export default TrainingRegistrationForm;
