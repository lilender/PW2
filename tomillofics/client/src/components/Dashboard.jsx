import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import Carrusel from './Carrusel';
import CarruselCovers from './CarruselCovers';
//import BrownLine from './BrownLine';
//import CoverLink from './CoverLink';
import CoversRow from './CoversRow';

function Dashboard(){
    return (
        <div className='back-color pb-5'>
            <NavBar></NavBar>
            <div className='data-container'>
                <Carrusel></Carrusel>
                <CoversRow header='Mis historias'
                covers={[
                    { src: '/img/Mirrors (5).png', content: 'Néctar de la noche'},
                    { src: '/img/Mirrors (6).png', content: 'El crepúsculo de la...'},
                    { src: '/img/Mirrors (7).png', content: 'La tierra del más allá'},
                    { src: '/img/Mirrors (8).png', content: 'Clouds'},
                    { src: '/img/Mirrors (9).png', content: 'Dreams'}
                ]}></CoversRow>
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