import 'bootstrap/dist/css/bootstrap.css';
import Comment from './Comment';
import Pags from './Pagination';
import BTNMain from './BTNMain';

function CommentsSection(){
    return(
        <div className='comments-section'>
            <div className='data-container d-flex justify-content-center align-items-center flex-column px-5'>
                <div className='row align-self-start p-4 px-5 pb-0 ms-3'>
                    <h1 className='title-light p-0'>Comentarios</h1>
                </div>
                <Comment src="/img/tomilloprofile.png" userName='Lilender' commentText='HHHHHHaaaaaaaaaaaa'></Comment>
                <Comment src="/img/tomilloprofile.png" userName='Lilender' commentText='aaaaaaaaaaaa'></Comment>
                <Comment src="/img/tomilloprofile.png" userName='Lilender' commentText='aaaaaaaaaaaa'></Comment>
                <Pags></Pags>
                <textarea className='me-3 mt-4 p-3 comment-textarea' placeholder='Deja un comentario...' name="" id=""></textarea>
                <div className='d-flex flex-row-reverse m-4 me-5 pe-5 w-100'>
                    <BTNMain type='3' content='Publicar comentario'></BTNMain>
                </div>
            </div>
        </div>
    );
}

export default CommentsSection;