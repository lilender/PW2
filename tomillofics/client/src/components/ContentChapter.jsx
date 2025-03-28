import 'bootstrap/dist/css/bootstrap.css';

function ContentChapter(props){
    return(
        <p className='chapter row justify-content-start author m-0 p-2 w-100'>Capítulo 1. {props.content}</p>
    );
}

export default ContentChapter;