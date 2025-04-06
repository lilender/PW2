import 'bootstrap/dist/css/bootstrap.css';

function CheckBoxes(props){
    return(
        <label className="d-flex justify-content-start align-items-center bulgy-checkboxes p-0 ms-3 m-1">
            <input 
            type="checkbox" 
            id={props.id} 
            name={props.name}
            onChange={props.onChange}
            checked={props.checked}
            />
            <span className="checkbox m-1 me-2"></span>
            <span className='categories '>{props.content}</span>
        </label>
    );
}

export default CheckBoxes;