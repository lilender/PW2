import NavBar from './NavBar';
import BrownLine from './BrownLine';
import ContentChapter from './ContentChapter';
import BTNMain from './BTNMain';
import CategorySelector from './CategorySelector';
import CheckBoxes from './CheckBoxes';
import Swal from 'sweetalert2';
import { useFic } from "./FicContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NewFic(){
    const { fic, setFic, addChapter } = useFic();
    const nav = useNavigate();

    const handleAddChapter = () => {
        addChapter({
            id: fic.chapters.length + 1,
            title: `Nuevo capítulo`,
            text: ''
        });
    };

    const uploadCover = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                fic.file = file;
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
    
                    reader.onload = function (e) {
                        const img = new Image();
                        img.src = e.target.result;
    
                        img.onload = function () {
                            if (img.width / img.height !== 16 / 25) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'La imagen debe tener la muy extraña relación de 16:25. Por favor, intenta de nuevo.'
                                });
                            } else {
                                const imgElement = document.querySelector('.cover img');
                                imgElement.src = e.target.result;
                                fic.img_route = e.target.result;
                                resolve(e.target.result);
                            }
                        };
                    };
                });
            }
        };
        input.click();
    }

    const handlePublish = () => {
        if (fic.title === '' || fic.description === '' || fic.img_route === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos antes de publicar.'
            });
            return;
        } 
        if (fic.chapters.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, agrega al menos un capítulo antes de publicar.'
            });
            return;
        }

        const data = new FormData();
        data.append("title", fic.title);
        data.append("description", fic.description);
        data.append("completed", fic.completed);
        data.append("iduser", localStorage.getItem("iduser"));
        data.append("cover", fic.file);

        axios.post("http://localhost:3001/createFic", 
            data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(
            (resp)=>{
                if(resp.data.message === "Success"){
                    console.log("Fic created");
                    fic.id = resp.data.idfic;
                } else {
                    console.log("Error creating fic")
                }
            }
        ).catch(
            (error)=>{
                console.log(error)
            }
        ).then(
            () => {
                fic.tags.forEach((tag) => {
                    console.log(tag.idtag);
                    if ( parseInt(tag.idtag) === 0){
                        axios.post("http://localhost:3001/createTag", {
                            name: tag.name
                        }).then(
                            (resp)=>{
                                if(resp.data.message === "Success"){
                                    console.log("Tag created")
                                    tag.idtag = resp.data.idtag;
                                } else {
                                    console.log("Error creating tag")
                                }
                            }
                        ).catch(
                            (error)=>{
                                console.log(error)
                            }
                        ).then(
                            () => {
                                axios.post("http://localhost:3001/tagFic", {
                                    idtag: tag.idtag,
                                    idfic: fic.id
                                }).then(
                                    (resp)=>{
                                        if(resp.data.message === "Success"){
                                            console.log("Tag added to fic")
                                        } else {
                                            console.log("Error adding tag to fic")
                                        }
                                    }
                                ).catch(
                                    (error)=>{
                                        console.log(error)
                                    }
                                )
                            }
                        )
                    } else {
                        axios.post("http://localhost:3001/tagFic", {
                            idtag: tag.idtag,
                            idfic: fic.id
                        }).then(
                            (resp)=>{
                                if(resp.data.message === "Success"){
                                    console.log("Tag added to fic")
                                } else {
                                    console.log("Error adding tag to fic")
                                }
                            }
                        ).catch(
                            (error)=>{
                                console.log(error)
                            }
                        )
                    }
                })

                fic.chapters.forEach((chapter) => {
                    axios.post("http://localhost:3001/createChapter", {
                        title: chapter.title,
                        text: chapter.text,
                        idfic: fic.id,
                        idchapter: chapter.id
                    }).then(
                        (resp)=>{
                            if(resp.data.message === "Success"){
                                console.log("Chapter created")
                            } else {
                                console.log("Error creating chapter")
                            }
                        }
                    ).catch(
                        (error)=>{
                            console.log(error)
                        }
                    )
                })
            }
        )

        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Tu historia ha sido publicada con éxito.'
        });

        setFic({
            id: 0,
            title: "",
            description: "",
            completed: false,
            img_route: "/img/default-cover.png",
            file: null,
            tags: [],
            chapters: [],
        });
        
        nav(`/Profile/${encodeURIComponent(localStorage.getItem("iduser"))}`);
    }

    return(
        <div className='back-color'>
            <NavBar></NavBar>
            <div className='data-container'>
                <div className='row justify-content-center new-fic'>
                    <div className='col-6 px-5 pt-3 align-self-center'>
                        <div className='px-5'>
                            <div className='cover row p-0 m-0'>
                                <img className='' src={fic.img_route} alt="" />
                            </div>
                        </div>
                        <div className='row justify-content-center p-1 px-5'>
                            <div className='w-50'>
                                <BTNMain onClick={uploadCover} content='Subir portada' type={'2'}></BTNMain>
                            </div>
                        </div>
                    </div>
                    <div className='col-6 pt-2'>
                        <div className="tomillo-input dark m-1 mb-3 mx-0">
                            <p>Título de tu historia</p>
                            <input value={fic.title} onChange={(e) => setFic({ ...fic, title: e.target.value })} type="text" />
                        </div>
                        <CategorySelector></CategorySelector>
                        <div className="tomillo-input dark m-1 mb-1 mx-0">
                            <p>Descripción de tu historia</p>
                            <textarea value={fic.description} onChange={(e) => setFic({ ...fic, description: e.target.value })} rows='8'></textarea>
                        </div>
                        <div className='row pb-2'>
                        <CheckBoxes 
                        content='Historia completada' 
                        id='complete-fic' 
                        value='complete'
                        checked={fic.completed}
                        onChange={(e) => setFic({ ...fic, completed: e.target.checked })}
                        ></CheckBoxes>
                        </div>
                        <BrownLine type='1'></BrownLine>
                        <div className='row justify-content-center align-items-center'>
                            <h1 className='content col-9 m-0 mt-0'>Contenido</h1>
                            <div className='col-3 w-25 p-0 m-0 pe-3'>
                                <BTNMain content='Agregar capítulo' type={'2'} onClick={handleAddChapter}></BTNMain>
                            </div>
                        </div>
                        <div className="p-0 m-0 mb-3">
                            <div className="chapters-container d-flex flex-column align-items-start">
                                {fic.chapters.map((chapter) => (
                                    <ContentChapter id={chapter.id} type={false} content={ ` ${chapter.id}. ` + chapter.title} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center new-fic p-3'>
                    <BrownLine type='1'></BrownLine>
                    <div className='px-5 w-25'>
                        <BTNMain onClick={handlePublish} content='Publicar historia' type={'1'}></BTNMain>
                    </div>
                </div>
            </div>
        </div>
    
    );
}

export default NewFic;