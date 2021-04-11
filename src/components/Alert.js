const Alert = props => {
    return (
        <div className="notification is-success">
            <button className="delete" onClick={() => props.onDelete()}></button>
            {props.message}
        </div>
    );
}

export default Alert;
