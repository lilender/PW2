import { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import BrownLine from './BrownLine';
import BTNMain from './BTNMain';
import ChapterDrop from './ChapterDrop';

function WriteChapter(){
    const [fontSize, setFontSize] = useState(16);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
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
    const [content, setContent] = useState('');
    const textareaRef = useRef(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [content]);

    //autoguardado
    const [saving, setSaving] = useState(false);
    let saveTimeout = useRef(null);

    useEffect(() => {
        const savedContent = localStorage.getItem('chapterContent');
        if (savedContent) {
            setContent(savedContent);
        }
    }, []);

    useEffect(() => {
        if (content) {
            setSaving(true);

            clearTimeout(saveTimeout.current);
            saveTimeout.current = setTimeout(() => {
                localStorage.setItem('chapterContent', content);
                setSaving(false);
            }, 1500);
        }
    }, [content]);

    const handleInputChange = (event) => {
        setContent(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const cursorPos = textareaRef.current.selectionStart;
            const beforeText = content.slice(0, cursorPos);
            const afterText = content.slice(cursorPos);

            const lastChar = beforeText.slice(1);
            const newText = lastChar === '\n' ? '\n\n' : '\n\n';

            setContent(beforeText + newText + afterText);

            // Mueve el cursor a la nueva posición
            setTimeout(() => {
                textareaRef.current.selectionStart = cursorPos + newText.length;
                textareaRef.current.selectionEnd = cursorPos + newText.length;
            }, 0);
        }
    };

    return(
        <div className={`back-color ${isDarkMode ? 'dark' : 'light'}`}>
            <NavBar></NavBar>
            <div className='data-container px-5'>
                <div className={`back-color-chapter ${isDarkMode ? 'dark' : 'light'} row justify-content-center px-5`}>
                    <h1 className='title row justify-content-center align-items-center mt-3 mb-0'>Hasta el último beso</h1>
                    <h1 className='author row justify-content-center align-items-center mt-1'>By Lilender</h1>
                    <h1 className='chapter-title row justify-content-center align-items-center mt-2 mb-3'>Capítulo 1. Una vez en invierno</h1>
                    <BrownLine type='1'></BrownLine>
                    <div className={`chapter-text ${isDarkMode ? 'dark' : 'light'} mt-3`} style={{ fontSize: `${fontSize}px` }}>
                        <textarea
                            ref={textareaRef}
                            name="chapter"
                            id="chapter-editor"
                            value={content}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
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
                            <BTNMain type='4' content="/img/a-left.png"></BTNMain>
                            <ChapterDrop theme={isDarkMode ? 'dark' : 'light'}></ChapterDrop>
                            <BTNMain type='4' content="/img/a-right.png"></BTNMain>
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