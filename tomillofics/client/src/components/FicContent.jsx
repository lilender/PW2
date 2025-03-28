import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import FicData from './FicData';
import BrownLine from './BrownLine';
import ContentChapter from './ContentChapter';
import BTNMain from './BTNMain';
import KudosComents from './KudosComents';

function FicContent(props){
    return(
        <div className='back-color'>
            <NavBar></NavBar>
            <div className='data-container'>
                <div className='row justify-content-center fic-content'>
                    <div className='col-6 px-5 pt-3'>
                        <div className='px-5'>
                            <div className='cover row p-0 m-0'>
                                <img className='' src={props.coversrc} alt="" />
                            </div>
                        </div>
                        <div className='row p-1 px-5'>
                            <BTNMain content='Guardar como favorito' type={1}></BTNMain>
                        </div>
                    </div>
                    <div className='col-6 pt-2'>
                        <FicData 
                            title={props.fictittle}
                            author={props.ficauthor}
                            description={props.ficdescription}
                            txtareaRows={props.fictxtrows}
                            tags={props.tags}
                        />
                        <div className='row justify-content-start align-items-center mt-2'>
                            <div className='d-flex justify-content-start align-items-center'>
                                <KudosComents type='1' number={props.kudos}></KudosComents>
                                <KudosComents type='2' number={props.kudos}></KudosComents>
                            </div>
                        </div>
                        <p className='row date m-1 ms-0 mb-3'>Historia completada el {props.publisheddate}</p>
                        <BrownLine type='1'></BrownLine>
                        <h1 className='content mt-2'>Contenido</h1>
                        <div className="p-0 m-0 mb-3">
                            <div className="chapters-container d-flex flex-column align-items-start">
                            {props.chapters?.map((contentchapter, index) => (
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