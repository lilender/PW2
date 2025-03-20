import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import Carrusel from './Carrusel';
import CarruselCovers from './CarruselCovers';
import BrownLine from './BrownLine';
import CoverLink from './CoverLink';

function Dashboard(){
    return (
        <div className='back-color pb-5'>
            <NavBar></NavBar>
            <div className='data-container'>
                <Carrusel></Carrusel>
                <BrownLine></BrownLine>
                <h1 className='title m-0 mt-4 p-0'>Últimas lecturas</h1>
                <div className='row justify-content-around mt-3 mx-0 px-5'>
                    <CoverLink src={'/img/Mirrors (5).png'} content="Néctar de la noche"></CoverLink>
                    <CoverLink src={'/img/Mirrors (6).png'} content="El crepúsculo de la..."></CoverLink>
                    <CoverLink src={'/img/Mirrors (7).png'} content="La tierra del más allá"></CoverLink>
                    <CoverLink src={'/img/Mirrors (8).png'} content="Clouds"></CoverLink>
                    <CoverLink src={'/img/Mirrors (9).png'} content="Dreams"></CoverLink>
                </div>
                <h1 className='title m-0 mt-5 p-0'>Tu bliblioteca</h1>
            </div>
            <div className='brown-banner row justify-content-center w-100 m-0 p-0 mt-4 px-5'>
                <CarruselCovers theme="light"></CarruselCovers>
            </div>
            <div className='data-container mt-5'>
                <h1 className='title data-container mt-5 m-0 mb-3 p-0'>Los más discutidos</h1>
            </div>
            <div className='row justify-content-around w-100 m-0 p-0 px-5'>
                <CarruselCovers theme="dark"></CarruselCovers>
            </div>
            <div className='data-container mt-5'>
                <h1 className='title data-container mt-5 m-0 mb-3 p-0'>Historias frescas</h1>
            </div>
            <div className='brown-banner row justify-content-center w-100 m-0 p-0 mt-4 px-5'>
                <CarruselCovers theme="light"></CarruselCovers>
            </div>
            <div className='data-container mt-5'>
                <h1 className='title data-container mt-5 m-0 mb-3 p-0'>Maratón de lectura</h1>
            </div>
            <div className='row justify-content-around w-100 m-0 p-0 px-5'>
                <CarruselCovers theme="dark"></CarruselCovers>
            </div>
        </div>
    );
}

export default Dashboard;