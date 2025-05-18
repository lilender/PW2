import TopFanfics from './TopFanfics';
import Carusel from './Carusel';
import BTNMain from './BTNMain';
import PrimeNavBar from './PrimeNavBar';
import Banner from './Banner';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Welcome(){

    const [topFics, setTopFics] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/favoriteFics`)
        .then(resp => {
            if (resp.data.message === "Success") {
                setTopFics(resp.data.fics);
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
                    text: 'No se pudo obtener la información de los fics.'
                });
            }
        }
        );
    }, []);

    return(
        <div className='back-color'>
            <PrimeNavBar />
            <Banner />
            <div className="data-container">
                <div className="col-8">
                    <h1 className="mt-5 mb-4 ">Escoge un fanfic y empieza a leer</h1>
                    <p className="mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel dolor eros. Aenean sed mi nisi. Aliquam eu nisl eget libero lobortis posuere. Praesent semper, urna tristique porttitor tincidunt, velit enim vehicula nulla, vitae gravida ipsum nulla ut risus. Nam et turpis iaculis, congue eros tincidunt, fermentum elit.</p>
                </div>
                <div className="col-3">
                    <BTNMain content='Comienza a leer' type={'1'}></BTNMain>
                </div>
                <div className="col-8">
                    <div className="content-slider">
                        <div className="slider">
                            <div className="mask">
                                <ul>
                                    <li className="anim1 ">
                                        <Carusel />
                                    </li>
                                    <li className="anim2">
                                        <Carusel />
                                    </li>
                                    <li className="anim3">
                                        <Carusel />
                                    </li>
                                    <li className="anim4">
                                        <Carusel />
                                    </li>
                                    <li className="anim5">
                                        <Carusel />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    Array.isArray(topFics) && topFics.length > 0 ?
                    <div className='TopFanfics mt-5 p-2 justify-content-center text-center'>
                        <h1 className="m-5">TOP Fanfics del momento</h1>
                        <div className="tops m-3 mb-0">
                            <div className="row m-4">
                                <p className='col-3 num'>#1</p>
                                <TopFanfics id={topFics[0].idfic}/>
                            </div>
                            <div className='row m-5'>
                                <TopFanfics id={topFics[1].idfic}/>
                                <p className='col-3 num'>#2</p>
                            </div>
                            <div className='row m-5'>
                                <p className='col-3 num'>#3</p>
                                <TopFanfics id={topFics[2].idfic}/>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                }
                
            </div>
        </div>
    );
}

export default Welcome;