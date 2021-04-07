const Input = (props) => {
    return (
        <div className="field">
            <label className="label">{props.label}</label>
            <div className="control">
                <input className="input"
                    placeholder={props.placeholder}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default Input;
