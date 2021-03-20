import TrainingRegistrationForm from "../components/TrainingRegistrationForm";
import { Link } from "react-router-dom";

const Index = (props) => {
  return (
    <div>
      <h1>NETERO</h1>
      <p>Welcome to Netero</p>
      <ul>
        {props.trainings.map((tr) => (
          <li key={tr.id}>
            <Link to={`/detail/${tr.id}`}>
              {tr.name} {tr.velocity} {tr.unit}&nbsp;
            </Link>
            {props.achievedSet.has(tr.id) ? (
              <span>✅</span>
            ) : (
              <button onClick={(e) => props.handleClick(e, tr.id)}>達成</button>
            )}
          </li>
        ))}
      </ul>
      <TrainingRegistrationForm
        trainingName={props.trainingName}
        trainingVelocity={props.trainingVelocity}
        trainingUnit={props.trainingUnit}
        handleSubmit={props.handleSubmit}
        handleChange={props.handleChange}
      />
      <button type="button">ログアウトする</button>
    </div>
  );
};

export default Index;
