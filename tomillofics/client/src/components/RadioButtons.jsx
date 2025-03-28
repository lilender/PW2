import 'bootstrap/dist/css/bootstrap.css';

function RadioButtons(props){
    if(props.checked){
        return(
            <label className="d-flex justify-content-center align-items-center ms-3 m-1">
                <input type="radio" name={props.name} value={props.value} checked/>
                <span className="radio m-1"></span>
                <span className="label categories">{props.content}</span>
            </label>
        );
    }else{
        return(
            <label className="d-flex justify-content-center align-items-center ms-3 m-1">
                <input type="radio" name={props.name} value={props.value}/>
                <span className="radio m-1"></span>
                <span className="label categories">{props.content}</span>
            </label>
        );
    }
}

export default RadioButtons;