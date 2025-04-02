import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import FicData from './FicData';
import BrownLine from './BrownLine';
import ContentChapter from './ContentChapter';
import BTNMain from './BTNMain';
import KudosComents from './KudosComents';

import { useParams } from "react-router-dom";

function FicContent(props){
    const { id: encodedId } = useParams();
    const id = decodeURIComponent(encodedId);

    return(
        <div className='back-color'>
            <NavBar></NavBar>
            <div className='data-container'>
                <div className='row justify-content-center fic-content'>
                    <div className='col-6 px-5 pt-3'>
                        <div className='px-5'>
                            <div className='cover row p-0 m-0'>
                                <img className='' src='/img/Mirrors (5).png' alt="" />
                            </div>
                        </div>
                        <div className='row p-1 px-5'>
                            <BTNMain content='Guardar como favorito' type={'1'}></BTNMain>
                        </div>
                    </div>
                    <div className='col-6 pt-2'>
                        <FicData 
                            title='Néctar de la noche'
                            author='Lilender'
                            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel dolor eros. Aenean sed mi nisi. Aliquam eu nisl eget libero lobortis posuere. Praesent semper, urna tristique porttitor tincidunt, velit enim vehicula nulla, vitae gravida ipsum nulla ut risus. Nam et turpis iaculis, congue eros tincidunt, fermentum elit.'
                            txtareaRows='4'
                            tags={[
                                { type: '1', content: 'Completada' },
                                { type: '2', content: 'Contenido sexual' },
                                { type: '3', content: 'Amor' },
                                { type: '3', content: 'Time travel' },
                                { type: '3', content: 'Enemies to lovers' },
                                { type: '3', content: 'Drama' },
                                { type: '4', content: '+'}
                            ]}
                        />
                        <div className='row justify-content-start align-items-center mt-2'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <KudosComents type={'1'} number='200'></KudosComents>
                                <KudosComents type={'2'} number='900'></KudosComents>
                            </div>
                        </div>
                        <p className='row date m-1 ms-0 mb-3'>Historia completada el 17 de julio de 2022</p>
                        <BrownLine type='1'></BrownLine>
                        <h1 className='content mt-2'>Contenido</h1>
                        <div className="p-0 m-0 mb-3">
                            <div className="chapters-container d-flex flex-column align-items-start">
                            {[
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno' },
                    { content: 'Una vez en invierno'}
                ]?.map((contentchapter, index) => (
                                <ContentChapter key={index} content={contentchapter.content} />
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FicContent;