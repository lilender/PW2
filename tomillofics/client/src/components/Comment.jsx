import 'bootstrap/dist/css/bootstrap.css';

function Comment(props){
    return(
        <div className='row comment p-2 me-3 my-3'>
            <div className="d-flex bd-highlight align-items-center">
                <div className="p-0 bd-highlight">
                    <button type="button" className="profile d-flex justify-content-center align-items-center">
                        <img src={props.src} alt="Logo" />
                    </button>
                </div>
                <div className="p-0 bd-highlight">
                    <p className='m-0'>{props.userName}</p>
                </div>
            </div>
            <div className="mb-1">
                <p>{props.commentText}</p>
            </div>
        </div>
    );
}

export default Comment;