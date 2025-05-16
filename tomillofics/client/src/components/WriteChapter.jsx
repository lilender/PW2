import { useState, useRef, useEffect } from 'react';
import NavBar from './NavBar';
import BrownLine from './BrownLine';
import BTNMain from './BTNMain';
import ChapterDrop from './ChapterDrop';
import { useFic } from "./FicContext";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function WriteChapter(){
    const nav = useNavigate();
    const { fic, updateChapter, setFic } = useFic();
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

    const handleInputChange = (event) => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';

        updateChapter(id, { ...fic.chapters[id - 1], text: event.target.value });
        console.log(fic.chapters);
    };

    const performModerationCheck = async (chapterText) => {
        try {
            console.log('Attempting moderation check with text:', chapterText.substring(0, 100) + '...');
            
            let response;
            try {
                // Try the expected endpoint first
                response = await axios.post('/api/check', {
                    text: chapterText
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } catch (endpointError) {
                console.error('Error with /api/check endpoint:', endpointError);
                
                // If the first endpoint fails, try a fallback (check in your server console logs 
                // what the actual endpoint path should be)
                console.log('Trying fallback endpoint...');
                response = await axios.post('/check', {
                    text: chapterText
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            
            console.log('Moderation API response:', response.status);
            
            const moderationResults = response.data;
            console.log('Moderation results:', moderationResults);
            
            const categoryToTagMap = {
                "Toxic": 1,             // Tóxico
                "Insult": 2,            // Insulto
                "Profanity": 3,         // Blasfemia
                "Derogatory": 4,        // Despectivo
                "Sexual": 5,            // Sexual
                "Death, Harm & Tragedy": 6, // Muerte, daño y tragedia
                "Violent": 7,           // Violento
                "Firearms & Weapons": 8, // Armas
                "Health": 9,            // Salud
                "Religion & Belief": 10, // Religión y creencias
                "Illicit Drugs": 11,    // Drogas ilícitas
                "War & Conflict": 12,   // Guerra y conflicto
                "Politics": 13          // Política
            };
            
            let hasInappropriateContent = false;
            let continueNavigation = true;
            
            const detectedCategories = [];
            const tagsToAdd = [];
            
            // Just collect information about potential inappropriate content
            if (moderationResults && Object.keys(moderationResults).length > 0 && !moderationResults["No Inappropriate Content"]) {
                hasInappropriateContent = true;
                
                // Instead of immediately updating the fic state, just prepare the tags
                for (const category in moderationResults) {
                    if (category === "No Inappropriate Content") continue;
                    
                    const tagId = categoryToTagMap[category];
                    
                    if (tagId) {
                        tagsToAdd.push({
                            id: tagId,
                            name: Object.entries(categoryToTagMap).find(([key, value]) => value === tagId)[0]
                        });
                        
                        detectedCategories.push(category);
                    }
                }
            }
            
            // If there's inappropriate content, ask for user confirmation
            if (hasInappropriateContent) {
                const categoriesText = detectedCategories.join(', ');
                
                const result = await Swal.fire({
                    color: '#4C0B0B',
                    background: '#EACDBD',
                    iconColor: '#4C0B0B',
                    customClass: {
                        confirmButton: "btn-main",
                        cancelButton: "btn-sec",
                        title: 'title',
                    },
                    icon: 'warning',
                    title: 'Contenido Inapropiado',
                    text: `Se ha detectado posible contenido inapropiado: ${categoriesText}. ¿Deseas añadir las etiquetas correspondientes y continuar?`,
                    showCancelButton: true,
                    confirmButtonText: 'Continuar',
                    cancelButtonText: 'Revisar'
                });
                
                if (!result.isConfirmed) {
                    continueNavigation = false;
                    return { hasInappropriateContent, continueNavigation };
                }
                
                // Only add the tags if the user confirmed
                if (result.isConfirmed && tagsToAdd.length > 0) {
                    setFic((prev) => {
                        // Filter out tags that already exist
                        const newTags = tagsToAdd.filter(
                            newTag => !prev.tags.some(existingTag => existingTag.id === newTag.id)
                        );
                        
                        return {
                            ...prev,
                            tags: [...prev.tags, ...newTags],
                        };
                    });
                }
            }
            
            Swal.fire({
                color: '#4C0B0B',
                background: '#EACDBD',
                iconColor: '#4C0B0B',
                customClass: {
                    confirmButton: "btn-main",
                    title: 'title',
                },
                icon: 'success',
                title: 'Guardado',
                text: 'El contenido ha sido guardado correctamente.',
                timer: 1500,
                showConfirmButton: false
            });

            return { hasInappropriateContent, continueNavigation: true };
        } catch (error) {
            // Detailed error logging
            console.error('Error in performModerationCheck:', error);
            
            // Axios error handling
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                throw new Error(`Error ${error.response.status}: ${error.response.data.message || 'Error al verificar el contenido'}`);
            } else if (error.request) {
                console.error('Error request:', error.request);
                
                // If we can't reach the moderation API, we'll allow navigation
                // but log the error for debugging
                console.warn('Skipping moderation check due to server error');
                
                // Show a warning to the user
                await Swal.fire({
                    color: '#4C0B0B',
                    background: '#EACDBD',
                    iconColor: '#4C0B0B',
                    customClass: {
                        confirmButton: "btn-main",
                        title: 'title',
                    },
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'No se pudo verificar el contenido, pero se guardará de todos modos.',
                    timer: 2000,
                    showConfirmButton: false
                });
                
                // Return success to allow navigation
                return { hasInappropriateContent: false, continueNavigation: true };
            } else {
                console.error('Error message:', error.message);
                throw error;
            }
        }
    };

    const handleChapterChange = async (chapter) => {
        try {
            Swal.fire({
                color: '#4C0B0B',
                background: '#EACDBD',
                iconColor: '#4C0B0B',
                customClass: {
                    confirmButton: "btn-main",
                    cancelButton: "btn-sec",
                    title: 'title',
                },
                icon: 'info',
                title: 'Guardando...',
                text: 'Verificando contenido, por favor espere.',
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            
            setSaving(true);
            
            const result = await performModerationCheck(fic.chapters[id - 1].text);
            setSaving(false);
            
            if (result.continueNavigation) {
                setTimeout(() => {
                    nav("/Chapter/" + chapter);
                }, 1000); // Shorter delay for chapter navigation
            }
        } catch (error) {
            console.error('Error during moderation check:', error);
            
            const result = await Swal.fire({
                color: '#4C0B0B',
                background: '#EACDBD',
                iconColor: '#4C0B0B',
                customClass: {
                    confirmButton: "btn-main",
                    cancelButton: "btn-sec",
                    title: 'title',
                },
                icon: 'error',
                title: 'Error',
                text: `Ocurrió un error al verificar el contenido: ${error.message}. ¿Deseas cambiar de capítulo de todos modos?`,
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Revisar'
            });
            
            setSaving(false);
            
            if (result.isConfirmed) {
                nav("/Chapter/" + chapter);
            }
        }
    };

    const handleBack = async () => {
        try {
            Swal.fire({
                color: '#4C0B0B',
                background: '#EACDBD',
                iconColor: '#4C0B0B',
                customClass: {
                    confirmButton: "btn-main",
                    cancelButton: "btn-sec",
                    title: 'title',
                },
                icon: 'info',
                title: 'Guardando...',
                text: 'Verificando contenido, por favor espere.',
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            
            setSaving(true);
            
            const result = await performModerationCheck(fic.chapters[id - 1].text);
            setSaving(false);
            
            if (result.continueNavigation) {
                setTimeout(() => {
                    if (fic.id === 0) {
                        nav("/Fic");
                    } else {
                        nav("/FicEdit/" + fic.id);
                    }
                }, 1500);
            }
        } catch (error) {
            console.error('Error during moderation check:', error);
            
            const result = await Swal.fire({
                color: '#4C0B0B',
                background: '#EACDBD',
                iconColor: '#4C0B0B',
                customClass: {
                    confirmButton: "btn-main",
                    cancelButton: "btn-sec",
                    title: 'title',
                },
                icon: 'error',
                title: 'Error',
                text: `Ocurrió un error al verificar el contenido: ${error.message}. ¿Deseas continuar de todos modos?`,
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Revisar'
            });
            
            setSaving(false);
            
            if (result.isConfirmed) {
                if (fic.id === 0) {
                    nav("/Fic");
                } else {
                    nav("/FicEdit/" + fic.id);
                }
            }
        }
    };

    return(
        <div className={`back-color ${isDarkMode ? 'dark' : 'light'}`}>
            <NavBar></NavBar>
            <div className='data-container px-5'>
                <div className={`back-color-chapter ${isDarkMode ? 'dark' : 'light'} row justify-content-center px-5`}>
                    <div className='row justify-content-between align-items-center mt-3 mb-0'>
                        <div className='col-2 m-0'>
                            <BTNMain onClick={handleBack} type='1' content="Guardar y salir"></BTNMain>
                        </div>
                        <p className='instructions col-6 m-0 p-0'>Para asignar un nombre al capítulo has click sobre 'Nuevo capítulo'</p>
                    </div>
                    <h1 className='row justify-content-center align-items-center title mt-1 mb-0'>{fic.title}</h1>                        
                    <h1 className='row justify-content-center align-items-center author mt-1'>By {localStorage.getItem("username")}</h1>
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