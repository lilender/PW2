import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import Carrusel from './Carrusel';
import BrownLine from './BrownLine';
import CoverLink from './CoverLink';

function Dashboard(){
    return (
        <div className='back-color'>
            <NavBar></NavBar>
            <div className='data-container'>
                <Carrusel></Carrusel>
                <BrownLine></BrownLine>
                <h1 className='title m-0 mt-4 p-0'>Últimas lecturas</h1>
                <div className='row justify-content-center mt-3 mx-0 px-0'>
                    <CoverLink></CoverLink>
                    <CoverLink></CoverLink>
                    <CoverLink></CoverLink>
                    <CoverLink></CoverLink>
                    <CoverLink></CoverLink>
                </div>
                <h1 className='title m-0 mt-4 p-0'>Tu bliblioteca</h1>
            </div>
        </div>
    );
}

export default Dashboard;