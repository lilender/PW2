import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import UserBanner from './UserBanner';
import BrownLine from './BrownLine';
import CoversRow from './CoversRow';
import FanficFront from './FanficFront';
import Pags from './Pagination';
import CarruselCovers from './CarruselCovers';

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
    const [ficLastRead, setFicLastRead] = useState([]);
    const [ficLibrary, setFicLibrary] = useState([]);

    const nFics = 5; // Number of fics per page
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);

    const change = (valor) => {
        setUpdatedImage(valor);
    }

    useEffect(() => {
        setOffset((currentPage - 1) * nFics);
    }
    , [currentPage]);

    useEffect(() => {
        if(id === localStorage.getItem("iduser")){
            axios.get(`http://localhost:3001/libraryFics?iduser=${id}&nfics=${nFics}&npage=${offset}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicLibrary(resp.data.fics);
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
        }else{
            axios.get(`http://localhost:3001/userWrittenFics?iduser=${id}&nfics=${nFics}&npage=${offset}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setUserWrittenFics(resp.data.fics);
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
        }
    },[id, nFics, offset]);

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
                    setTotalPages(Math.ceil( parseInt(resp.data.saved_fics) / nFics));
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
                        text: 'No se pudo obtener la información del usuario.'
                    });
                }
            }
            );
            axios.get(`http://localhost:3001/lastReadFics?iduser=${id}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicLastRead(resp.data.fics);
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
            axios.get(`http://localhost:3001/userWrittenFics?iduser=${id}&nfics=100&npage=0`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setUserWrittenFics(resp.data.fics);
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
                    setTotalPages(Math.ceil( parseInt(resp.data.written_fics) / nFics));
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
                        text: 'No se pudo obtener la información del usuario.'
                    });
                }
            }
            );
        }
        
        
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
                        text: 'No se pudo obtener la información del usuario.'
                    });
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

                <div className='data-container mt-5'>
                    <h1 className='title data-container mt-5 m-0 mb-3 p-0'>Mis historias</h1>
                </div>

                <div className='row justify-content-around w-100 m-0 p-0 px-5'>
                    <CarruselCovers fics={userWrittenFics} theme="dark"></CarruselCovers>
                </div>

                <div className='data-container'>
                    <CoversRow header='Últimas lecturas'
                    fics={ficLastRead}></CoversRow>
                </div>

                <div className='data-container'>
                    <BrownLine></BrownLine>
                    <h1 className='title m-0 mt-4 p-0'>Historias guardadas</h1>
                    <div className='data-container mt-4'>
                        {
                        Array.isArray(ficLibrary) && ficLibrary.length > 0 ?
                        ficLibrary.map((fic) => (
                                <FanficFront key={fic.idfic} idfic={fic.idfic} type='2'></FanficFront>
                            ))
                            :
                            <div className='col-12 text-center'>
                                <p>No hay fics disponibles.</p>
                            </div>
                        }
                        <Pags totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pags>
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
                        <Pags totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pags>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default UserOnline;