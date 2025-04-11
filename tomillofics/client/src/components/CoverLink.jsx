import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function CoverLink(props){
    const [ficInfo, setFicInfo] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/ficBasicInfo?idfic=${props.idfic}`)
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
    return(
        <div className='col-2 p-1 m-1'>
            <div className='cover-link p-1'>
                <div className='cover row p-0 m-0'>
                    <img className='' src={`http://localhost:3001/public${ficInfo.img_route}`} alt="" />
                </div>
                <p className='row m-0 mt-1 p-0'>{ficInfo.title}</p>
            </div>
        </div>
    );
}

export default CoverLink;