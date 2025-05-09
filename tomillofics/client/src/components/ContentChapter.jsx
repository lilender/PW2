import BTNMain from './BTNMain';
import { useNavigate } from 'react-router-dom';
import { useFic } from "./FicContext";

function ContentChapter(props){
    const nav = useNavigate();
    const { removeChapter } = useFic();

    const handleEdit = () => {
        nav("/Chapter/" + props.id);
    }
    const handleErase = () => {
        removeChapter(props.id);
    }
    const handleClick = () => {
        nav("/Chapter/" + props.idfic + "/" + props.id);
    }

    if(props.type){
        return(
            <p onClick={handleClick} className='chapter row justify-content-start author m-0 p-2 w-100'>Capítulo {props.id}. {props.content}</p>
        );   
    }else{
        return(
            <div className='chapter row justify-content-center align-items-center m-0 p-2 w-100'>
                <p onClick={handleClick} className='author col-10 m-0 p-0'>Capítulo {props.id}. {props.content}</p>
                <div className='col-1 p-0 m-0'>
                    <BTNMain onClick={handleErase} type='6' content="/img/trash.png"></BTNMain>
                </div>
                <div className='col-1 p-0 m-0'>
                    <BTNMain onClick={handleEdit} type='6' content="/img/pencil.png"></BTNMain>
                </div>
            </div>
        );
    }
}

export default ContentChapter;