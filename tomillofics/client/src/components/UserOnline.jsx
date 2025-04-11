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
    const [userWrittenFics, setUserWrittenFics] = useState([]);

    const change = (valor) => {
        setUpdatedImage(valor);
    }

    useEffect(() => {
        if(id === localStorage.getItem("iduser")){
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
        } else {
            axios.get(`http://localhost:3001/userPublicInfo?iduser=${id}`)
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
        }
        
        axios.get(`http://localhost:3001/userWrittenFics?iduser=${id}&nfics=5&npage=0`)
        .then(resp => {
            if (resp.data.message === "Success") {
                setUserWrittenFics(resp.data.fics);
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
                    fics={userWrittenFics}></CoversRow>
                    <CoversRow header='Últimas lecturas'
                    fics={userWrittenFics}></CoversRow>
                    <BrownLine></BrownLine>

                    <h1 className='title m-0 mt-4 p-0'>Historias guardadas</h1>
                    <div className='data-container mt-4'>
                        {
                        Array.isArray(userWrittenFics) && userWrittenFics.length > 0 ?
                        userWrittenFics.map((fic) => (
                                <FanficFront key={fic.idfic} idfic={fic.idfic} type='2'></FanficFront>
                            ))
                            :
                            <div className='col-12 text-center'>
                                <p>No hay fics disponibles.</p>
                            </div>
                        }
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
                        {
                        Array.isArray(userWrittenFics) && userWrittenFics.length > 0 ?
                        userWrittenFics.map((fic) => (
                                <FanficFront key={fic.idfic} idfic={fic.idfic} type='2'></FanficFront>
                            ))
                            :
                            <div className='col-12 text-center'>
                                <p>No hay fics disponibles.</p>
                            </div>
                        }
                        <Pags></Pags>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default UserOnline;