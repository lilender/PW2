import 'bootstrap/dist/css/bootstrap.css';

function BrownLine(props){
    if (props.type == 1){
        return(
            <div className="brown-line"></div>
        );
    }else if(props.type == 3){
        return(
            <div className="vertical-brown-line"></div>
        );
    }else{
        return(
            <div className="brown-line-two mt-5"></div>
        );
    }
    
}

export default BrownLine;