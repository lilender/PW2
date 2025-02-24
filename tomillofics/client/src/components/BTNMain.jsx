import 'bootstrap/dist/css/bootstrap.css';

function BTNMain(props){
    return (
        <>
            {props.type === 1 ? <button className="btn-main my-4">{props.content}</button> : <button className="btn-sec my-4">{props.content}</button>}
        </>
        
    );
}

export default BTNMain;