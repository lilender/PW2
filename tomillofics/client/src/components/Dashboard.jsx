import NavBar from './NavBar';
import Carrusel from './Carrusel';
import CarruselCovers from './CarruselCovers';
//import BrownLine from './BrownLine';
//import CoverLink from './CoverLink';
import CoversRow from './CoversRow';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Dashboard(){
    const iduser = localStorage.getItem("iduser");
    const [ficLastRead, setFicLastRead] = useState([]);
    const [ficTop, setFicTop] = useState([]);
    const [ficFresh, setFicFresh] = useState([]);
    const [ficMarathon, setFicMarathon] = useState([]);
    const [ficMostDiscussed, setFicMostDiscussed] = useState([]);
    const [ficLibrary, setFicLibrary] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/favoriteFics`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicTop(resp.data.fics);
                } else {
                    Swal.fire('Error', 'No se pudo obtener la información de los fics.', 'error');
                }
            }
        );
        axios.get(`http://localhost:3001/lastReadFics?iduser=${iduser}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicLastRead(resp.data.fics);
                } else {
                    Swal.fire('Error', 'No se pudo obtener la información de los fics.', 'error');
                }
            }
        );
        axios.get(`http://localhost:3001/libraryFics?iduser=${iduser}&nfics=15&npage=0`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicLibrary(resp.data.fics);
                } else {
                    Swal.fire('Error', 'No se pudo obtener la información de los fics.', 'error');
                }
            }
        );
        axios.get(`http://localhost:3001/newestFics`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicFresh(resp.data.fics);
                } else {
                    Swal.fire('Error', 'No se pudo obtener la información de los fics.', 'error');
                }
            }
        );
        axios.get(`http://localhost:3001/longestFics`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicMarathon(resp.data.fics);
                } else {
                    Swal.fire('Error', 'No se pudo obtener la información de los fics.', 'error');
                }
            }
        );
        axios.get(`http://localhost:3001/mostCommentedFics`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicMostDiscussed(resp.data.fics);
                } else {
                    Swal.fire('Error', 'No se pudo obtener la información de los fics.', 'error');
                }
            }
        );
    }
    , [iduser]);

    return (
        <div className='back-color pb-5'>
            <NavBar></NavBar>
            <div className='data-container'>
                <Carrusel
                fics={ficTop}></Carrusel>
                <CoversRow header='Últimas lecturas'
                fics={ficLastRead}></CoversRow>
                <h1 className='title m-0 mt-5 p-0'>Tu bliblioteca</h1>
            </div>
            <div className='brown-banner row justify-content-center w-100 m-0 p-0 mt-4 px-5'>
                <CarruselCovers fics={ficLibrary} theme="light"></CarruselCovers>
            </div>
            <div className='data-container mt-5'>
                <h1 className='title data-container mt-5 m-0 mb-3 p-0'>Los más discutidos</h1>
            </div>
            <div className='row justify-content-around w-100 m-0 p-0 px-5'>
                <CarruselCovers fics={ficMostDiscussed} theme="dark"></CarruselCovers>
            </div>
            <div className='data-container mt-5'>
                <h1 className='title data-container mt-5 m-0 mb-3 p-0'>Historias frescas</h1>
            </div>
            <div className='brown-banner row justify-content-center w-100 m-0 p-0 mt-4 px-5'>
                <CarruselCovers fics={ficFresh} theme="light"></CarruselCovers>
            </div>
            <div className='data-container mt-5'>
                <h1 className='title data-container mt-5 m-0 mb-3 p-0'>Maratón de lectura</h1>
            </div>
            <div className='row justify-content-around w-100 m-0 p-0 px-5'>
                <CarruselCovers fics={ficMarathon} theme="dark"></CarruselCovers>
            </div>
        </div>
    );
}

export default Dashboard;