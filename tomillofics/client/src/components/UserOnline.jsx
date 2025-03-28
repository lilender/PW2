import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import UserBanner from './UserBanner';
import BrownLine from './BrownLine';
import CoversRow from './CoversRow';
import FanficFront from './FanficFront';
import Pags from './Pagination';

function UserOnline(){
    return(
        <div className='back-color'>
            <NavBar></NavBar>
            <UserBanner type='2'></UserBanner>
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
    );
}

export default UserOnline;