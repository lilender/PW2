interface Props{
    content: string;
    type: number;
}

function Input({content, type} : Props){
    return (
        <div className="tomillo-input m-4">
            <p>{content}</p>
            {type === 1 ? <input type="text" /> : <input type="password" />}
        </div>
    );
}

export default Input;