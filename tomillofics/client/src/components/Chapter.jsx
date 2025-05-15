import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import BrownLine from './BrownLine';
import BTNMain from './BTNMain';
import ChapterDrop from './ChapterDrop';
import CommentSection from './CommentsSection';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function Chapter(){
    const {idFic: idFicEncoded, idChapter: idChapterEncoded } = useParams();
    const idFic = decodeURIComponent(idFicEncoded);
    const idChapter = decodeURIComponent(idChapterEncoded);
    const [ficInfo, setFicInfo] = useState([]);
    const [chapterInfo, setChapterInfo] = useState({});

    const nav = useNavigate();

    useEffect(() => {
        axios.get(`/api/ficInfoWTag?idfic=${idFic}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicInfo(resp.data);
                } else {
                    Swal.fire('Error', 'No se pudo obtener la información del fic.', 'error');
                }
            }
        )
        .catch(error => {
            console.error('Error fetching data:', error);
            Swal.fire('Error', 'No se pudo obtener la información del fic.', 'error');
        });
        axios.get(`/api/ficChapters?idfic=${idFic}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setFicInfo(prevState => ({
                        ...prevState,
                        chapters: resp.data.chapters.map(chapter => ({
                            id: chapter.idchapter,
                            title: chapter.title,
                        }))
                    }));
                } else {
                    Swal.fire('Error', 'No se pudo obtener la información de los capítulos.', 'error');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                Swal.fire('Error', 'No se pudo obtener la información de los capítulos.', 'error');
            });
        
    }
    , [idFic]);

    useEffect(() => {
        axios.get(`/api/chapterText?idfic=${idFic}&idchapter=${idChapter}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setChapterInfo(resp.data);
                    console.log(resp.data.text);
                }
                else {
                    Swal.fire('Error', 'No se pudo obtener el texto del capítulo.', 'error');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                Swal.fire('Error', 'No se pudo obtener el texto del capítulo.', 'error');
            });

            axios.post(`/api/viewFic`, {
                idfic: idFic,
                iduser: localStorage.getItem('iduser'),
                lastread: idChapter
            })
                .then(resp => {
                    if (resp.data.message === "Success") {
                        console.log('Fic viewed successfully');
                    } else {
                        Swal.fire('Error', 'No se pudo registrar la vista del fic.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error registering view:', error);
                    Swal.fire('Error', 'No se pudo registrar la vista del fic.', 'error');
                }
            );
    }, [idFic, idChapter]);

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

    const handleChapterChange = (chapter) => {
        nav("/Chapter/" + idFic + "/" + chapter);
    }

    const handleClick = () => {
        nav("/Profile/" + ficInfo.iduser );
    }

    if (!ficInfo || ficInfo.length === 0 || !ficInfo.chapters || ficInfo.chapters.length === 0) {
        return <></>;
    }

    return(
        <>
        <div className={`back-color ${isDarkMode ? 'dark' : 'light'}`}>
            <NavBar></NavBar>
            <div className='data-container px-5'>
                <div className={`back-color-chapter ${isDarkMode ? 'dark' : 'light'} row justify-content-center px-5`}>
                    <h1 className='title row justify-content-center align-items-center mt-3 mb-0'>{ficInfo.title}</h1>
                    <h1 onClick={handleClick} className='author row justify-content-center align-items-center mt-1'>By {ficInfo.username}</h1>
                    <h1 className='chapter-title row justify-content-center align-items-center mt-2 mb-3'>Capítulo {idChapter}. {chapterInfo.title}</h1>
                    <BrownLine type='1'></BrownLine>
                    <div className='chapter-text mt-3' style={{ fontSize: `${fontSize}px` }}>
                        <p>{chapterInfo.text}</p>
                    </div>
                    <BrownLine type='1'></BrownLine>
                    <div className='row justify-content-center align-items-center p-1 px-2 mt-3 mb-0'>
                        <div className='d-flex w-25 justify-content-center align-items-center m-0'>
                            {idChapter > 1 && (
                                <BTNMain onClick={()=>handleChapterChange(parseInt(idChapter) - 1)} type='4' content="/img/a-left.png"></BTNMain>
                            )}
                            <ChapterDrop chapterChange={handleChapterChange} chapters={ficInfo.chapters} theme={isDarkMode ? 'dark' : 'light'}></ChapterDrop>
                            {idChapter < ficInfo.chapters.length && (
                                <BTNMain onClick={()=>handleChapterChange(parseInt(idChapter) + 1)} type='4' content="/img/a-right.png"></BTNMain>
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
        <CommentSection idfic={idFic} idchapter={idChapter}></CommentSection>
        </>

    );
}

export default Chapter;