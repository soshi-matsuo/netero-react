import axios from 'axios';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trainings: [],
            achievedSet: new Set()
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/index`)
            .then((res) => {
                this.setState({
                    trainings: res.data.trainings,
                    achievedSet: res.data.achievedSet
                });
            });
    }

    render() {
        return (
            <div>
                <h1>NETERO</h1>
                <p>Welcome to Netero</p>
                <ul>
                    {this.state.trainings.map(tr =>
                        <li key={tr.id}>{tr.name} {tr.velocity} {tr.unit}</li>
                    )}
                </ul>
                <input type="text" name="name" />
                <br />
                <input type="number" name="velocity" />
                <br />
                <input type="text" name="unit" />
                <br />
                <button type="button">登録</button>
                <br />
                <button type="button">ログアウトする</button>
            </div>
        );
    }
}

export default App;