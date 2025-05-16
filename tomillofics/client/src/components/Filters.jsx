import RadioButtons from './RadioButtons';
import CheckBoxes from './CheckBoxes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Filters({searchText, setFicStatus, totalFics, ficStatus, setIdTags, setExcludeIdTags}) {

    const [estatic, setStaticCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState('');
    const [checkedCategories, setCheckedCategories] = useState([]);

    //only once
    useEffect(() => {
        axios.get(`/api/staticTags`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setStaticCategories(resp.data.tags);
                } else {
                    Swal.fire({
                        color: '#4C0B0B',
                        background: '#EACDBD',
                        iconColor: '#4C0B0B',
                        customClass: {
                            confirmButton: "btn-main",
                            cancelButton: "btn-sec",
                            title: 'title',
                        },
                        icon: 'error',
                        text: 'No se pudo obtener la información de las categorías.'
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }
    , []);

    useEffect(() => {
        axios.get(`/api/userTags?text=${query}&ntags=${5}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    // Check if the category is already in checkedCategories
                    const filteredCategories = resp.data.tags.filter((cat) => !checkedCategories.some((checkedCat) => checkedCat.idtag === cat.idtag));
                    setCategories(filteredCategories);
                } else {
                    Swal.fire({
                        color: '#4C0B0B',
                        background: '#EACDBD',
                        iconColor: '#4C0B0B',
                        customClass: {
                            confirmButton: "btn-main",
                            cancelButton: "btn-sec",
                            title: 'title',
                        },
                        icon: 'error',
                        text: 'No se pudo obtener la información de las categorías.'
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, [query, checkedCategories]);

    const handleCheckbox = (e) => {
        console.log(e.target);
        const { id, checked } = e.target;
        const numericId = isNaN(Number(id)) ? id : Number(id);
        
        if (checked) {
            //look for categories in categorias and in static categories
            const categoryInStatic = estatic.find((cat) => cat.idtag === numericId);
            const categoryInCategories = categories.find((cat) => cat.idtag === numericId);

            if(categoryInStatic) {
                console.log("Checking static category:", categoryInStatic);
                setExcludeIdTags((prev) => prev + ',' + numericId);
            }

            if (categoryInCategories) {
                setCheckedCategories((prev) => [...prev, categoryInCategories]);
                setCategories((prev) => prev.filter((cat) => cat.idtag !== numericId));
                setIdTags((prev) => prev + ',' + numericId);
            }
        } else {
            console.log("Unchecking:", numericId);
            setExcludeIdTags((prev) => prev.replace(',' + numericId, ''));
            setIdTags((prev) => prev.replace(',' + numericId, ''));
            setCheckedCategories((prev) => prev.filter((cat) => cat.idtag !== numericId));
        }
    }
    
    return(
        <div className='col-4 m-0 p-0'>
            <div className='filter-background pt-3'>
                <h1 className='row justify-content-center title mb-4'>FILTROS</h1>
                <p className='row justify-content-center search-word m-0'>"{searchText}"</p>
                <p className='row justify-content-center results'>{totalFics} resultados</p>
                
                <div className='d-flex flex-column justify-content-center align-items-center bulgy-radios'>
                    <div className='d-flex flex-column align-items-start'>
                        <p className='row justify-content-center section m-0 p-0 mb-1'>Información general</p>
                        <RadioButtons onchange={setFicStatus} content='Historias completadas' value={1} name='fic-options' checked={ficStatus === 1} ></RadioButtons>
                        <RadioButtons onchange={setFicStatus} content='Historias en progreso' value={0} name='fic-options' checked={ficStatus === 0} ></RadioButtons>
                        <RadioButtons onchange={setFicStatus} content='Todas las historias' value={-1} name='fic-options' checked={ficStatus === -1} ></RadioButtons>
                    </div>
                </div>

                <div className='d-flex flex-column justify-content-center align-items-center bulgy-checkboxes mt-2 m-0 p-0'>
                    <div className='d-flex flex-column align-items-start'>
                        <p className='row justify-content-center align-items-center section m-0 p-0 mb-1'>Advertencias</p>
                        {
                            estatic.map((cat) => (
                                <CheckBoxes key={cat.idtag} onChange={handleCheckbox} content={cat.name} id={cat.idtag} value={cat.name}></CheckBoxes>
                            ))
                        }
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center mt-2 m-0 p-0'>
                    <div className='d-flex flex-column align-items-start'>
                        <p className='row justify-content-center align-items-center section m-0 p-0 mb-1'>Categorias</p>
                        <div className="tomillo-input">
                            <p className='light-text'>Buscar categorías</p>
                            <input type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className=' bulgy-checkboxes'>
                            {
                                categories.map((cat) => (
                                    <CheckBoxes key={cat.idtag} onChange={handleCheckbox} content={cat.name} id={cat.idtag}></CheckBoxes>
                                ))
                            }
                            {
                                checkedCategories.map((cat) => (
                                    <CheckBoxes key={cat.idtag} checked={true} onChange={handleCheckbox} content={cat.name} id={cat.idtag}></CheckBoxes>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filters;