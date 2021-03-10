import Input from './Input';

const TrainingRegistrationForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Input
                type={'text'}
                name={'trainingName'}
                value={props.trainingName}
                onChange={props.handleChange}
            />
            <br />
            <Input
                type={'number'}
                name={'trainingVelocity'}
                value={props.trainingVelocity}
                onChange={props.handleChange}
            />
            <br />
            <Input
                type={'text'}
                name={'trainingUnit'}
                value={props.trainingUnit}
                onChange={props.handleChange}
            />
            <br />
            <input type="submit" value="登録" />
        </form>
    );
};
export default TrainingRegistrationForm;
