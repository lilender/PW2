import Tag from './Tag';
import { useNavigate } from 'react-router-dom';
function FicData(props){
    const nav = useNavigate();
    const handleClick = () => {
        nav("/Profile/" + props.iduser );
    }
    return(
        <div>
            <h1 className='row title m-0 mt-2'>{props.title}</h1>
                <h2 onClick={handleClick} className='row author m-0'>By {props.author}</h2>
                <div className='d-flex p-0 m-0 mt-1 justify-content-start'>
                    {props.tags?.map((tag, index) => (
                        <Tag key={index} type={tag.type} content={tag.content} />
                    ))}
                </div>
                <div className='row m-0'>
                    <textarea className='description mt-1 p-0 col-12' name="" id="" readOnly rows={props.txtareaRows} value={props.description}> </textarea>
            </div>
        </div>
    );
}

export default FicData;