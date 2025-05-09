import { useState, useRef, useEffect } from 'react';
import NavBar from './NavBar';
import BrownLine from './BrownLine';
import BTNMain from './BTNMain';
import ChapterDrop from './ChapterDrop';
import { useFic } from "./FicContext";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function WriteChapter(){
    const nav = useNavigate();
    const { fic, updateChapter } = useFic();
    const { id: encodedId } = useParams();
    const id = decodeURIComponent(encodedId);

    const [fontSize, setFontSize] = useState(16);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('mode_pref') === '0';
    });

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const increaseFontSize = () => {
        setFontSize(prevSize => Math.min(prevSize + 2, 30));
    };

    const decreaseFontSize = () => {
        setFontSize(prevSize => Math.max(prevSize - 2, 12));
    };

    //Cosas del textarea :v
    const textareaRef = useRef(null);

    //autoguardado
    const [saving, setSaving] = useState(false);
    let saveTimeout = useRef(null);

    const handleInputChange = (event) => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';

        updateChapter(id, { ...fic.chapters[id - 1], text: event.target.value });
        setSaving(true);

        clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
            //localStorage.setItem('chapterContent', content);
            setSaving(false);
        }, 1500);
    };

    const handleChapterChange = (chapter) => {
        nav("/Chapter/" + chapter);
    }

    return(
        <div className={`back-color ${isDarkMode ? 'dark' : 'light'}`}>
            <NavBar></NavBar>
            <div className='data-container px-5'>
                <div className={`back-color-chapter ${isDarkMode ? 'dark' : 'light'} row justify-content-center px-5`}>
                    <div className='row justify-content-between align-items-center mt-3 mb-0'>
                        <div className='col-2 m-0'>
                            <BTNMain onClick='' type='1' content="Guardar y salir"></BTNMain>
                        </div>
                        <p className='instructions col-6 m-0 p-0'>Para asignar un nombre al capítulo has click sobre 'Nuevo capítulo'</p>
                    </div>
                    <h1 className='row justify-content-center align-items-center title mt-1 mb-0'>{fic.title}</h1>                        
                    <h1 className='author row justify-content-center align-items-center mt-1'>By {localStorage.getItem("username")}</h1>
                    <input className='special-input row' type="text" value={fic.chapters[id - 1].title} onChange={(e) => updateChapter(id, { ...fic.chapters[id - 1], title: e.target.value }) }></input>
                    <BrownLine type='1'></BrownLine>
                    <div className={`chapter-text ${isDarkMode ? 'dark' : 'light'} mt-3`} style={{ fontSize: `${fontSize}px` }}>
                        <textarea
                            ref={textareaRef}
                            name="chapter"
                            id="chapter-editor"
                            value={fic.chapters[id - 1].text}
                            onChange={handleInputChange}
                            placeholder="Escribe tu capítulo aquí..."
                        ></textarea>
                    </div>
                    <BrownLine type='1'></BrownLine>
                    <div className='row justify-content-center align-items-center p-1 mt-3 mb-0'>
                        <p className='saving' style={{ color: saving ? 'green' : 'gray' }}>
                            {saving ? 'Guardando...' : 'Guardado'}
                        </p>
                    </div>
                    <div className='row justify-content-center align-items-center p-1 px-2 mt-3 mb-0'>
                        <div className='d-flex w-25 justify-content-center align-items-center m-0'>
                            {id > 1 && (
                                <BTNMain onClick={()=>handleChapterChange(parseInt(id) - 1)} type='4' content="/img/a-left.png"></BTNMain>
                            )}
                            <ChapterDrop chapterChange={handleChapterChange} chapters={fic.chapters} theme={isDarkMode ? 'dark' : 'light'}></ChapterDrop>
                            {id < fic.chapters.length && (
                                <BTNMain onClick={()=>handleChapterChange(parseInt(id) + 1)} type='4' content="/img/a-right.png"></BTNMain>
                            )}
                        </div>
                    </div>
                    <div className='row justify-content-center w-25 m-0'>
                        <div className='col-7 m-0 p-0'>
                            <BTNMain type='2' content={isDarkMode ? 'Modo claro' : 'Modo oscuro'} onClick={toggleDarkMode}></BTNMain>
                        </div>
                        <div className='col-1 p-0 py-4 m-0'>
                            <BrownLine type='3'></BrownLine>
                        </div>
                        <div className='col-2 m-0 p-0'>
                            <BTNMain type='2' content='a-' onClick={decreaseFontSize}></BTNMain>
                        </div>
                        <div className='col-2 m-0 p-0'>
                            <BTNMain type='2' content='a+' onClick={increaseFontSize}></BTNMain>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WriteChapter;