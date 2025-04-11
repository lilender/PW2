import FicData from './FicData';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function FanficFront(props){

    const [ficInfo, setFicInfo] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/ficInfoWTag?idfic=${props.idfic}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicInfo(resp.data);
                } else {
                    Swal.fire('Error', 'No se pudo obtener la información del fic.', 'error');
                }
            }
        );
    }
    , [props.idfic]);

    if(props.type === '1'){
        return(
            <div className='fanfic-front row justify-content-center py-3'>
                <div className='col-3 align-self-center'>
                    <div className='cover row p-0 m-0'>
                        <img className='m-0 p-0' src={`http://localhost:3001/public${ficInfo.img_route}`} alt="" />
                    </div>
                </div>
                <div className='col-9 py-3 ms-0 ps-0 align-self-start'>
                    <FicData 
                        title={ficInfo.title}
                        author={ficInfo.username}
                        txtareaRows ='6'
                        description={ficInfo.description}
                        tags={ficInfo.tags}
                    />
                </div>
            </div>
        );
    }else{
        return(
            <div className='fanfic-front-two row justify-content-center py-3'>
                <div className='col-3 align-self-center'>
                    <div className='cover row p-0 m-0'>
                        <img className='m-0 p-0' src={`http://localhost:3001/public${ficInfo.img_route}`} alt="" />
                    </div>
                </div>
                <div className='col-9 py-3 ms-0 ps-0 align-self-start'>
                    <FicData 
                        title={ficInfo.title}
                        author={ficInfo.username}
                        description={ficInfo.description}
                        txtareaRows ='6'
                        tags={ficInfo.tags}
                    />
                </div>
            </div>
        );
    }
    
}

export default FanficFront;