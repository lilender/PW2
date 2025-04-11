import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import FicData from './FicData';
import BrownLine from './BrownLine';
import ContentChapter from './ContentChapter';
import BTNMain from './BTNMain';
import KudosComents from './KudosComents';

import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function FicContent(){
    const { id: encodedId } = useParams();
    const id = decodeURIComponent(encodedId);
    const [ficInfo, setFicInfo] = useState([]);

    const iduser = localStorage.getItem("iduser");

    useEffect(() => {
        axios.get(`http://localhost:3001/ficCompleteInfo?idfic=${id}&iduser=${iduser}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicInfo(resp.data);
                } else {
                    Swal.fire('Error', 'No se pudo obtener la información del fic.', 'error');
                }
            }
        )
        .catch(error => {
            console.error('Error fetching data:', error);
            Swal.fire('Error', 'No se pudo obtener la información del fic.', 'error');
        });
    }
    , [id, iduser]);

    const handleSave = () => {
        axios.post('http://localhost:3001/saveFic', 
            {
                idfic: id,
                iduser: iduser,
                saved: ficInfo.saved === 0 ? 1 : 0
            }
        )
        .then(resp => {
            if (resp.data.message === "Success") {
                setFicInfo(prevState => ({
                    ...prevState,
                    saved: prevState.saved === 0 ? 1 : 0
                }));
            }
        })
        .catch(error => {
            console.error('Error saving data:', error);
            Swal.fire('Error', 'No se pudo guardar el fic como favorito.', 'error');
        });
    };

    return(
        <div className='back-color'>
            <NavBar></NavBar>
            <div className='data-container'>
                <div className='row justify-content-center fic-content'>
                    <div className='col-6 px-5 pt-3'>
                        <div className='px-5'>
                            <div className='cover row p-0 m-0'>
                                <img className='' src={`http://localhost:3001/public${ficInfo.img_route}`} alt="" />
                            </div>
                        </div>
                        <div className='row p-1 px-5'>
                            {
                                ficInfo.saved===0?
                                <BTNMain onClick={handleSave} content='Guardar como favorito' type={'1'}></BTNMain>
                                :
                                <BTNMain onClick={handleSave} content='Eliminar de favoritos' type={'2'}></BTNMain>
                            }
                        </div>
                    </div>
                    <div className='col-6 pt-2'>
                        <FicData 
                            title={ficInfo.title}
                            author={ficInfo.username}
                            txtareaRows ='4'
                            description={ficInfo.description}
                            tags={ficInfo.tags}
                        />
                        <div className='row justify-content-start align-items-center mt-2'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <KudosComents type={'1'} number={ficInfo.nfavs}></KudosComents>
                                <KudosComents type={'2'} number={ficInfo.ncomments}></KudosComents>
                            </div>
                        </div>
                        <p className='row date m-1 ms-0 mb-3'>{ficInfo.nviews} han leído este fic</p>
                        <BrownLine type='1'></BrownLine>
                        <h1 className='content mt-2'>Contenido</h1>
                        <div className="p-0 m-0 mb-3">
                            <div className="chapters-container d-flex flex-column align-items-start">
                            {[
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno'}
                ]?.map((contentchapter, index) => (
                                <ContentChapter key={index} content={contentchapter.content} />
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FicContent;