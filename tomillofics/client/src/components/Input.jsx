
function Input(props){
    return (
        <div className="tomillo-input m-4">
            <p>{props.content}</p>
            {props.type === 1 ? <input type="text" /> : <input type="password" />}
        </div>
    );
}

export default Input;