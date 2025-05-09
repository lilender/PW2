import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function CoverLink(props){
    const [ficInfo, setFicInfo] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/ficBasicInfo?idfic=${props.idfic}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicInfo(resp.data);
                } else {
                    Swal.fire({
                        color: '#4C0B0B',
                        background: '#EACDBD',
                        iconColor: '#4C0B0B',
                        customClass: {
                            confirmButton: "btn-main",
                            cancelButton: "btn-sec",
                            title: 'title',
                        },
                        icon: 'error',
                        text: 'No se pudo obtener la información del fic.'
                    });
                }
            }
        );
    }
    , [props.idfic]);

    const seeFic = () => {
        nav(`/Fic/${props.idfic}`);
    }

    return(
        <div onClick={seeFic} className='col-2 p-1 m-1'>
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