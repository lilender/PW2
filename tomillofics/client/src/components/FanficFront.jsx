import 'bootstrap/dist/css/bootstrap.css';
import FicData from './FicData';
import Tag from './Tag';

function FanficFront(props){
    if(props.type == 1){
        return(
            <div className='fanfic-front row justify-content-center py-3'>
                <div className='col-3 align-self-center'>
                    <div className='cover row p-0 m-0'>
                        <img className='m-0 p-0' src={props.src} alt="" />
                    </div>
                </div>
                <div className='col-9 py-3 ms-0 ps-0 align-self-start'>
                    <FicData 
                        title="Néctar de la noche"
                        author="Lilender"
                        txtareaRows ='6'
                        description="Un fanfic increíble sobre amor y viajes en el tiempo."
                        tags={props.tags}
                    />
                </div>
            </div>
        );
    }else{
        return(
            <div className='fanfic-front-two row justify-content-center py-3'>
                <div className='col-3 align-self-center'>
                    <div className='cover row p-0 m-0'>
                        <img className='m-0 p-0' src={props.src} alt="" />
                    </div>
                </div>
                <div className='col-9 py-3 ms-0 ps-0 align-self-start'>
                    <FicData 
                        title="Néctar de la noche"
                        author="Lilender"
                        description="Un fanfic increíble sobre amor y viajes en el tiempo."
                        txtareaRows ='6'
                        tags={props.tags}
                    />
                </div>
            </div>
        );
    }
    
}

export default FanficFront;