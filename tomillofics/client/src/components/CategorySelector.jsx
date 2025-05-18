import { useState } from 'react';
import { useEffect } from 'react';
import Tag from './Tag';
import axios from 'axios';
import { useFic } from "./FicContext";

function CategorySelector() {
    const [query, setQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const { fic, setFic } = useFic();

    useEffect(() => {
        axios.get(`http://localhost:3001/userTags?text=${query}&ntags=${5}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setCategories(resp.data.tags);
                } else {
                    alert("Error al cargar las categorías");
                }
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
            });
    }, [query]);

    const handleTagClick = (category) => {
        if (!fic.tags.includes(category)) {
            setFic({...fic, tags: [...fic.tags, category]});
        }
        setQuery('');
    };

    const handleRemoveTag = (category) => {
        setFic({...fic, tags: fic.tags.filter(c => c.name !== category.name)});
    };

    return (
        <div>
            <div className="tomillo-input dark m-1 mb-0 mx-0">
                <p>Agrega cualquier categoría que describa a tu historia</p>
                <input 
                    type="text" 
                    placeholder="Buscar categoría, haz click sobre la que desees agregar"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {/* Mostrar categorías sugeridas */}
            <div className='d-flex p-0 m-0 mt-1 justify-content-start'>
                {categories.length > 0 ? (
                    categories.map((cat) => (
                        <div key={cat.idtag} onClick={() => handleTagClick(cat)} style={{ cursor: 'pointer' }}>
                            <Tag type='4' content={cat.name} />
                        </div>
                    ))
                ) : (
                    query && 
                    <div onClick={() => handleTagClick({idtag: 0, name: query})} style={{ cursor: 'pointer' }}>
                        <Tag type='4' content={query} />
                    </div>
                )}
            </div>

            {/* Mostrar categorías seleccionadas con delete btn xd */}
            <div className='d-flex p-0 m-0 mt-1 justify-content-start'>
                {fic.tags.map((cat) => (
                    <div key={cat.idtag} onClick={() => handleRemoveTag(cat)} style={{ cursor: 'pointer' }}>
                        <Tag type='5' content={`${cat.name} ✖`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategorySelector;