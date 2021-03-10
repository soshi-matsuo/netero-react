const Input = (props) => {
    return (
        <input
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
        />
    );
};

export default Input;
