import 'bootstrap/dist/css/bootstrap.css';

function Tag(props){
    if(props.type === '1'){
        return(
            <div className='tag-main m-1 ms-0'>
                <p className='m-1 mx-2 p-0'>{props.content}</p>
            </div>
        );
    }else if(props.type === '2'){
        return(
            <div className='tag-warning m-1 ms-0'>
                <p className='m-1 mx-2 p-0'>{props.content}</p>
            </div>
        );
    }else if(props.type === '3'){
        return(
            <div className='tag m-1 ms-0'>
                <p className='m-1 mx-2 p-0'>{props.content}</p>
            </div>
        );
    }else if(props.type == 5){
        return(
            <div className='tag-add m-1 ms-0'>
                <p className='m-1 mx-2 p-0'>{props.content}</p>
            </div>
        );
    }else{
        return(
            <div className='tag-plus m-1 ms-0'>
                <p className='m-1 mx-2 p-0'>{props.content}</p>
            </div>
        );
    }
    
}

export default Tag;