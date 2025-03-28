import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './NavBar';
import BrownLine from './BrownLine';
import BTNMain from './BTNMain';
import ChapterDrop from './ChapterDrop';
import CommentSection from './CommentsSection';

function Chapter(){
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


    return(
        <>
        <div className={`back-color ${isDarkMode ? 'dark' : 'light'}`}>
            <NavBar></NavBar>
            <div className='data-container px-5'>
                <div className={`back-color-chapter ${isDarkMode ? 'dark' : 'light'} row justify-content-center px-5`}>
                    <h1 className='title row justify-content-center align-items-center mt-3 mb-0'>Hasta el último beso</h1>
                    <h1 className='author row justify-content-center align-items-center mt-1'>By Lilender</h1>
                    <h1 className='chapter-title row justify-content-center align-items-center mt-2 mb-3'>Capítulo 1. Una vez en invierno</h1>
                    <BrownLine type='1'></BrownLine>
                    <div className='chapter-text mt-3' style={{ fontSize: `${fontSize}px` }}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel congue felis. Nunc erat metus, dapibus in sollicitudin eget, suscipit et leo. Nam a dignissim diam. Aenean consequat, est porta molestie ultrices, purus velit varius mauris, in blandit nunc ante nec dolor. Praesent in ultricies diam, nec dapibus diam. Integer sit amet dui turpis. Ut mollis, nulla id aliquet lobortis, quam justo viverra odio, eu tincidunt urna mi pulvinar lacus. Praesent et lobortis lorem. Nunc ultricies erat in rhoncus laoreet. Maecenas rutrum bibendum lobortis. Sed dignissim, orci sit amet tempor ullamcorper, tellus arcu iaculis ante, eu mollis turpis eros nec libero. Aenean egestas enim a egestas feugiat. In bibendum sit amet dui at vestibulum. Phasellus ut nisi tellus. Suspendisse tempus ultrices posuere.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    </div>
                    <BrownLine type='1'></BrownLine>
                    <div className='row justify-content-center align-items-center p-1 px-2 mt-3 mb-0'>
                        <div className='d-flex w-25 justify-content-center align-items-center m-0'>
                            <BTNMain type='4' content="/img/a-left.png"></BTNMain>
                            <ChapterDrop></ChapterDrop>
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
        <CommentSection></CommentSection>
        </>

    );
}

export default Chapter;