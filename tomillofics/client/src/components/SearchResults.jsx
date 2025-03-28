import 'bootstrap/dist/css/bootstrap.css';
import FanficFront from './FanficFront';
import Pags from './Pagination';

function SearchResults(){
    return(
        <div className='col-8'>
            <FanficFront src="/img/Mirrors (5).png" title="Néctar de la noche" author="Lilender"
                description="Un fanfic increíble sobre amor y viajes en el tiempo." type='true'
                tags={[
                    { type: '1', content: 'Completada' },
                    { type: '2', content: 'Contenido sexual' },
                    { type: '3', content: 'Amor' },
                    { type: '3', content: 'Time travel' },
                    { type: '3', content: 'Enemies to lovers' },
                    { type: '3', content: 'Drama' },
                    { type: '4', content: '+'}
                ]}> </FanficFront>

            <FanficFront src="/img/Mirrors (2).png" title="Néctar de la noche" author="Lilender"
                description="Un fanfic increíble sobre amor y viajes en el tiempo." type='true'
                tags={[
                    { type: '1', content: 'En progreso' },
                    { type: '2', content: 'Contenido sexual' },
                    { type: '3', content: 'Amor' },
                    { type: '3', content: 'Time travel' },
                    { type: '3', content: 'Enemies to lovers' },
                    { type: '3', content: 'Drama' },
                    { type: '4', content: '+'}
                ]}> </FanficFront>

            <FanficFront src="/img/Mirrors (9).png" title="Néctar de la noche" author="Lilender"
                description="Un fanfic increíble sobre amor y viajes en el tiempo." type='true'
                tags={[
                    { type: '1', content: 'Completada' },
                    { type: '2', content: 'Contenido sexual' },
                    { type: '3', content: 'Amor' },
                    { type: '3', content: 'Time travel' },
                    { type: '3', content: 'Enemies to lovers' },
                    { type: '3', content: 'Drama' },
                    { type: '4', content: '+'}
                ]}> </FanficFront>

            <FanficFront src="/img/Mirrors (11).png" title="Néctar de la noche" author="Lilender"
                description="Un fanfic increíble sobre amor y viajes en el tiempo." type='true'
                tags={[
                    { type: '1', content: 'Completada' },
                    { type: '2', content: 'Contenido sexual' },
                    { type: '3', content: 'Amor' },
                    { type: '3', content: 'Time travel' },
                    { type: '3', content: 'Enemies to lovers' },
                    { type: '3', content: 'Drama' },
                    { type: '4', content: '+'}
                ]}> </FanficFront>

            <FanficFront src="/img/Mirrors (12).png" title="Néctar de la noche" author="Lilender"
                description="Un fanfic increíble sobre amor y viajes en el tiempo." type='true'
                tags={[
                    { type: '1', content: 'Completada' },
                    { type: '2', content: 'Contenido sexual' },
                    { type: '3', content: 'Amor' },
                    { type: '3', content: 'Time travel' },
                    { type: '3', content: 'Enemies to lovers' },
                    { type: '3', content: 'Drama' },
                    { type: '4', content: '+'}
                ]}> </FanficFront>
            <FanficFront src="/img/Mirrors (13).png" title="Néctar de la noche" author="Lilender"
                description="Un fanfic increíble sobre amor y viajes en el tiempo." type='true'
                tags={[
                    { type: '1', content: 'Completada' },
                    { type: '2', content: 'Contenido sexual' },
                    { type: '3', content: 'Amor' },
                    { type: '3', content: 'Time travel' },
                    { type: '3', content: 'Enemies to lovers' },
                    { type: '3', content: 'Drama' },
                    { type: '4', content: '+'}
                ]}> </FanficFront>
            <FanficFront src="/img/Mirrors (14).png" title="Néctar de la noche" author="Lilender"
                description="Un fanfic increíble sobre amor y viajes en el tiempo." type='true'
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
    );
}

export default SearchResults;