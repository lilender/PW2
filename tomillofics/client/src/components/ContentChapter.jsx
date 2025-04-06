import BTNMain from './BTNMain';
import { useNavigate } from 'react-router-dom';
import { useFic } from "./FicContext";

function ContentChapter(props){
    const nav = useNavigate();
    const { removeChapter } = useFic();

    if(props.type){
        return(
            <p className='chapter row justify-content-start author m-0 p-2 w-100'>Capítulo{props.content}</p>
        );   
    }else{
        const handleClick = () => {
            nav("/Chapter/" + props.id);
        }
        const handleErase = () => {
            removeChapter(props.id);
        }
        return(
            <div className='chapter row justify-content-center align-items-center m-0 p-2 w-100'>
                <p className='author col-10 m-0 p-0'>Capítulo{props.content}</p>
                <div className='col-1 p-0 m-0'>
                    <BTNMain onClick={handleErase} type='6' content="/img/trash.png"></BTNMain>
                </div>
                <div className='col-1 p-0 m-0'>
                    <BTNMain onClick={handleClick} type='6' content="/img/pencil.png"></BTNMain>
                </div>
            </div>
        );
    }
}

export default ContentChapter;