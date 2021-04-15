const Alert = props => {
    return (
        <div className={`notification is-size-5-tablet is-size-6-mobile ${props.status}`}>
            <button className="delete" onClick={() => props.onDelete()}></button>
            {props.message}
        </div>
    );
}

export default Alert;
