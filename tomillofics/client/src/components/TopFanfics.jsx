import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function TopFanfics({id}){
    const [ficInfo, setFicInfo] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/ficTopInfo?idfic=${id}`)
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
                        title: 'Error',
                        text: 'No se pudo obtener la información del fic.'
                    });
                }
            }
        );
    }, [id]);

    return (
        <div className='col-9 justify-content-center pr-5'> 
            <div className='row'>
                <div className='col-3 img-container m-0 p-0'>
                    <img className='m-0' src={`http://localhost:3001/public${ficInfo.img_route}`} alt="" />
                </div>
                <div className='col-9 m-0 p-0 align-self-end'>
                    <div className='text-container p-3 row'>
                        <h2 className='title m-0'>{ficInfo.title}</h2>
                        <h3 className='author m-0'>{ficInfo.username}</h3>
                        <p className='description m-0'>{ficInfo.description}</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
//línea 5, clase tops estaba ahí, antes hacia algo ahora no, nota por si se rompe xd
//se refiere (creo) a <div className='col-9 justify-content-center pr-5'> 
export default TopFanfics;