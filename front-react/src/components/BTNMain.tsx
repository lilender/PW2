import 'bootstrap/dist/css/bootstrap.css';

interface Props{
    content: string;
    type: number;
}

function BTNMain({content, type} : Props){
    return (
        <>
            {type === 1 ? <button className="btn-main my-4">{content}</button> : <button className="btn-sec my-4">{content}</button>}
        </>
        
    );
}

export default BTNMain;