import 'bootstrap/dist/css/bootstrap.css';

function KudosComents(props){
    if(props.type == 1){
        return(
            <div className='d-flex justify-content-start align-items-center'>
                <p className='m-1 ms-0'>{props.number}</p> 
                <svg className='bi bi-heart-fill m-0' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
            </div>
        );
    }else{
        return(
            <div className='d-flex justify-content-start align-items-center'>
                <p className='m-1 ms-4'>{props.number}</p> 
                <svg className="bi bi-chat-left m-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                </svg>
            </div>
        );
    }
}

export default KudosComents;