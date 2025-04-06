import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import UserBanner from './UserBanner';
import BrownLine from './BrownLine';
import CoversRow from './CoversRow';
import FanficFront from './FanficFront';
import Pags from './Pagination';

import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';

import Swal from 'sweetalert2';
import axios from 'axios';

function UserOnline(){
    const { id: encodedId } = useParams();
    const id = decodeURIComponent(encodedId);
    const [updatedImage, setUpdatedImage] = useState(false);
    const [userData, setUserData] = useState({});
    const [profileImage, setProfileImage] = useState(null);

    const change = (valor) => {
        setUpdatedImage(valor);
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/userInfo?iduser=${id}`)
        .then(resp => {
            if (resp.data.message === "Success") {
                const storedImage = resp.data.profile_image;
                const profile_image = storedImage && storedImage !== "null" && storedImage !== "undefined"
                    ? `data:image/jpg;base64,${storedImage}`
                    : "/img/tomilloprofile.png";
                setProfileImage(profile_image);
                setUserData(resp.data);
            } else {
                Swal.fire('Error', 'No se pudo obtener la información del usuario.', 'error');
            }
        }
        );

        axios.get(`http://localhost:3001/userWrittenFics?iduser=${id}&nfics=5&npage=0`)
        .then(resp => {
            if (resp.data.message === "Success") {
                console.log(resp.data.fics);
            } else {
                Swal.fire('Error', 'No se pudo obtener la información de los fics.', 'error');
            }
        }
        );
    
    }, [id]);

    useEffect(() => {
        if(!updatedImage){
            return;
        }

        const iduser = localStorage.getItem("iduser");
        axios.get(`http://localhost:3001/userInfo?iduser=${iduser}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    localStorage.setItem("username", resp.data.username);
                    localStorage.setItem("profile_image", resp.data.profile_image);
                    localStorage.setItem("mode_pref", resp.data.mode_pref);

                    const storedImage = localStorage.getItem("profile_image");
                    const profile_image = storedImage && storedImage !== "null" && storedImage !== "undefined"
                        ? `data:image/jpg;base64,${storedImage}`
                        : "/img/tomilloprofile.png";
                    setProfileImage(profile_image);
                    setUserData(resp.data);
                } else {
                    Swal.fire('Error', 'No se pudo obtener la información del usuario.', 'error');
                }
            }
        );

        setUpdatedImage(false);
    }, [updatedImage]);

    if( String(id) === localStorage.getItem("iduser")){
        return(
            <>
            <div className='back-color'>
                <NavBar profileImage={profileImage}></NavBar>
                <UserBanner profileImage={profileImage} userData={userData} changed={change} type='1'></UserBanner>
                <div className='data-container'>
                    <CoversRow header='Mis historias'
                    covers={[
                        { src: '/img/Mirrors (5).png', content: 'Néctar de la noche'},
                        { src: '/img/Mirrors (6).png', content: 'El crepúsculo de la...'},
                        { src: '/img/Mirrors (7).png', content: 'La tierra del más allá'},
                        { src: '/img/Mirrors (8).png', content: 'Clouds'},
                        { src: '/img/Mirrors (9).png', content: 'Dreams'}
                    ]}></CoversRow>
                    <CoversRow header='Últimas lecturas'
                    covers={[
                        { src: '/img/Mirrors (5).png', content: 'Néctar de la noche'},
                        { src: '/img/Mirrors (6).png', content: 'El crepúsculo de la...'},
                        { src: '/img/Mirrors (7).png', content: 'La tierra del más allá'},
                        { src: '/img/Mirrors (8).png', content: 'Clouds'},
                        { src: '/img/Mirrors (9).png', content: 'Dreams'}
                    ]}></CoversRow>
                    <BrownLine></BrownLine>

                    <h1 className='title m-0 mt-4 p-0'>Historias guardadas</h1>
                    <div className='data-container mt-4'>
                        <FanficFront src="/img/Mirrors (5).png" title="Néctar de la noche" author="Lilender"
                        description="Un fanfic increíble sobre amor y viajes en el tiempo." type='2'
                        tags={[
                            { type: '1', content: 'Completada' },
                            { type: '2', content: 'Contenido sexual' },
                            { type: '3', content: 'Amor' },
                            { type: '3', content: 'Time travel' },
                            { type: '3', content: 'Enemies to lovers' },
                            { type: '3', content: 'Drama' },
                            { type: '4', content: '+'}
                        ]}> </FanficFront>
                        <FanficFront src="/img/Mirrors (5).png" title="Néctar de la noche" author="Lilender"
                        description="Un fanfic increíble sobre amor y viajes en el tiempo." type='2'
                        tags={[
                            { type: '1', content: 'Completada' },
                            { type: '2', content: 'Contenido sexual' },
                            { type: '3', content: 'Amor' },
                            { type: '3', content: 'Time travel' },
                            { type: '3', content: 'Enemies to lovers' },
                            { type: '3', content: 'Drama' },
                            { type: '4', content: '+'}
                        ]}> </FanficFront>
                        <FanficFront src="/img/Mirrors (5).png" title="Néctar de la noche" author="Lilender"
                        description="Un fanfic increíble sobre amor y viajes en el tiempo." type='2'
                        tags={[
                            { type: '1', content: 'Completada' },
                            { type: '2', content: 'Contenido sexual' },
                            { type: '3', content: 'Amor' },
                            { type: '3', content: 'Time travel' },
                            { type: '3', content: 'Enemies to lovers' },
                            { type: '3', content: 'Drama' },
                            { type: '4', content: '+'}
                        ]}> </FanficFront>
                        <FanficFront src="/img/Mirrors (5).png" title="Néctar de la noche" author="Lilender"
                        description="Un fanfic increíble sobre amor y viajes en el tiempo." type='2'
                        tags={[
                            { type: '1', content: 'Completada' },
                            { type: '2', content: 'Contenido sexual' },
                            { type: '3', content: 'Amor' },
                            { type: '3', content: 'Time travel' },
                            { type: '3', content: 'Enemies to lovers' },
                            { type: '3', content: 'Drama' },
                            { type: '4', content: '+'}
                        ]}> </FanficFront>
                        <FanficFront src="/img/Mirrors (5).png" title="Néctar de la noche" author="Lilender"
                        description="Un fanfic increíble sobre amor y viajes en el tiempo." type='2'
                        tags={[
                            { type: '1', content: 'Completada' },
                            { type: '2', content: 'Contenido sexual' },
                            { type: '3', content: 'Amor' },
                            { type: '3', content: 'Time travel' },
                            { type: '3', content: 'Enemies to lovers' },
                            { type: '3', content: 'Drama' },
                            { type: '4', content: '+'}
                        ]}> </FanficFront>
                        <Pags></Pags>
                    </div>
                </div>
            </div>
            </>
        )
    } else {
        return(
            <>
            <div className='back-color'>
                <NavBar></NavBar>
                <UserBanner profileImage={profileImage} userData={userData} type='2'></UserBanner>
                <div className='data-container'>
                    <BrownLine></BrownLine>
                    <h1 className='title m-0 mt-4 p-0'>Publicaciones</h1>
                    <div className='data-container mt-4'>
                        <FanficFront src="/img/Mirrors (5).png" title="Néctar de la noche" author="Lilender"
                        description="Un fanfic increíble sobre amor y viajes en el tiempo." type='2'
                        tags={[
                            { type: '1', content: 'Completada' },
                            { type: '2', content: 'Contenido sexual' },
                            { type: '3', content: 'Amor' },
                            { type: '3', content: 'Time travel' },
                            { type: '3', content: 'Enemies to lovers' },
                            { type: '3', content: 'Drama' },
                            { type: '4', content: '+'}
                        ]}> </FanficFront>
                        <FanficFront src="/img/Mirrors (5).png" title="Néctar de la noche" author="Lilender"
                        description="Un fanfic increíble sobre amor y viajes en el tiempo." type='2'
                        tags={[
                            { type: '1', content: 'Completada' },
                            { type: '2', content: 'Contenido sexual' },
                            { type: '3', content: 'Amor' },
                            { type: '3', content: 'Time travel' },
                            { type: '3', content: 'Enemies to lovers' },
                            { type: '3', content: 'Drama' },
                            { type: '4', content: '+'}
                        ]}> </FanficFront>
                        <FanficFront src="/img/Mirrors (5).png" title="Néctar de la noche" author="Lilender"
                        description="Un fanfic increíble sobre amor y viajes en el tiempo." type='2'
                        tags={[
                            { type: '1', content: 'Completada' },
                            { type: '2', content: 'Contenido sexual' },
                            { type: '3', content: 'Amor' },
                            { type: '3', content: 'Time travel' },
                            { type: '3', content: 'Enemies to lovers' },
                            { type: '3', content: 'Drama' },
                            { type: '4', content: '+'}
                        ]}> </FanficFront>
                        <FanficFront src="/img/Mirrors (5).png" title="Néctar de la noche" author="Lilender"
                        description="Un fanfic increíble sobre amor y viajes en el tiempo." type='2'
                        tags={[
                            { type: '1', content: 'Completada' },
                            { type: '2', content: 'Contenido sexual' },
                            { type: '3', content: 'Amor' },
                            { type: '3', content: 'Time travel' },
                            { type: '3', content: 'Enemies to lovers' },
                            { type: '3', content: 'Drama' },
                            { type: '4', content: '+'}
                        ]}> </FanficFront>
                        <FanficFront src="/img/Mirrors (5).png" title="Néctar de la noche" author="Lilender"
                        description="Un fanfic increíble sobre amor y viajes en el tiempo." type='2'
                        tags={[
                            { type: '1', content: 'Completada' },
                            { type: '2', content: 'Contenido sexual' },
                            { type: '3', content: 'Amor' },
                            { type: '3', content: 'Time travel' },
                            { type: '3', content: 'Enemies to lovers' },
                            { type: '3', content: 'Drama' },
                            { type: '4', content: '+'}
                        ]}> </FanficFront>
                        <Pags></Pags>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default UserOnline;