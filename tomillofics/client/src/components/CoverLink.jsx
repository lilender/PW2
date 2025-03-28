import 'bootstrap/dist/css/bootstrap.css';

function CoverLink(props){
    return(
        <div className='col-2 p-1 m-1'>
            <div className='cover-link p-1'>
                <div className='cover row p-0 m-0'>
                    <img className='' src={props.src} alt="" />
                </div>
                <p className='row m-0 mt-1 p-0'>{props.content}</p>
            </div>
        </div>
    );
}

export default CoverLink;