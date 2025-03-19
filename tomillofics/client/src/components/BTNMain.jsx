import 'bootstrap/dist/css/bootstrap.css';

function BTNMain(props){
    if (props.type === 1){
        return (
            <>
                {<button onClick={props.onClick} className="btn-main my-4">{props.content}</button>}
            </>
        );  
    } else if (props.type == 2){
        return (
            <>
                {<button onClick={props.onClick} className="btn-sec my-4">{props.content}</button>}
            </>
        );  
    } else {
        return (
            <>
                {<button onClick={props.onClick} className="btn-main w-25">{props.content}</button>}
            </>
        ); 
    }
    
}

export default BTNMain;