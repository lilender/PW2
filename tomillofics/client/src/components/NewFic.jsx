import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import BrownLine from './BrownLine';
import ContentChapter from './ContentChapter';
import BTNMain from './BTNMain';
import CategorySelector from './CategorySelector';
import CheckBoxes from './CheckBoxes';

function NewFic(){
    const [chapters, setChapters] = useState([
        { id: 1, title: ' 1. Nuevo capítulo' }
    ]);

    const handleAddChapter = () => {
        const newChapter = {
            id: chapters.length + 1,
            title: ` ${chapters.length + 1}. Nuevo capítulo`
        };
        setChapters([...chapters, newChapter]);
    };

    return(
        <div className='back-color'>
            <NavBar></NavBar>
            <div className='data-container'>
                <div className='row justify-content-center new-fic'>
                    <div className='col-6 px-5 pt-3 align-self-center'>
                        <div className='px-5'>
                            <div className='cover row p-0 m-0'>
                                <img className='' src='/img/default-cover.png' alt="" />
                            </div>
                        </div>
                        <div className='row justify-content-center p-1 px-5'>
                            <div className='w-50'>
                                <BTNMain content='Subir portada' type={2}></BTNMain>
                            </div>
                        </div>
                    </div>
                    <div className='col-6 pt-2'>
                        <div className="tomillo-input dark m-1 mb-3 mx-0">
                            <p>Título de tu historia</p>
                            <input type="text" />
                        </div>
                        <CategorySelector></CategorySelector>
                        <div className="tomillo-input dark m-1 mb-1 mx-0">
                            <p>Descripción de tu historia</p>
                            <textarea name="" id="" rows='8'></textarea>
                        </div>
                        <div className='row pb-2'>
                        <CheckBoxes content='Historia completada' id='complete-fic' value='complete'></CheckBoxes>
                        </div>
                        <BrownLine type='1'></BrownLine>
                        <div className='row justify-content-center align-items-center'>
                            <h1 className='content col-9 m-0 mt-0'>Contenido</h1>
                            <div className='col-3 w-25 p-0 m-0 pe-3'>
                                <BTNMain content='Agregar capítulo' type={2} onClick={handleAddChapter}></BTNMain>
                            </div>
                        </div>
                        <div className="p-0 m-0 mb-3">
                            <div className="chapters-container d-flex flex-column align-items-start">
                                {chapters.map((chapter) => (
                                    <ContentChapter key={chapter.id} type={false} content={chapter.title} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center new-fic p-3'>
                    <BrownLine type='1'></BrownLine>
                    <div className='px-5 w-25'>
                        <BTNMain content='Publicar historia' type={1}></BTNMain>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewFic;