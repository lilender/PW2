import { useState } from 'react';
import Tag from './Tag';
import 'bootstrap/dist/css/bootstrap.css';

function CategorySelector() {
    const [query, setQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const existingCategories = ['Fantasía', 'Romance', 'Acción', 'Misterio', 'Drama'];

    const filteredCategories = existingCategories.filter(category => 
        category.toLowerCase().includes(query.toLowerCase())
    );

    const handleTagClick = (category) => {
        if (!selectedCategories.includes(category)) {
            setSelectedCategories(prevCategories => [...prevCategories, category]);
        }
        setQuery('');
    };

    const handleRemoveTag = (category) => {
        setSelectedCategories(prevCategories => prevCategories.filter(c => c !== category));
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
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category, index) => (
                        <div key={index} onClick={() => handleTagClick(category)} style={{ cursor: 'pointer' }}>
                            <Tag type='4' content={category} />
                        </div>
                    ))
                ) : (
                    query && 
                    <div onClick={() => handleTagClick(query)} style={{ cursor: 'pointer' }}>
                        <Tag type='4' content={query} />
                    </div>
                )}
            </div>

            {/* Mostrar categorías seleccionadas con delete btn xd */}
            <div className='d-flex p-0 m-0 mt-1 justify-content-start'>
                {selectedCategories.map((category, index) => (
                    <div key={index} onClick={() => handleRemoveTag(category)} style={{ cursor: 'pointer' }}>
                        <Tag type='5' content={`${category} ✖`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategorySelector;