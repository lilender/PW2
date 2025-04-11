import RadioButtons from './RadioButtons';
import CheckBoxes from './CheckBoxes';

function Filters(){
    return(
        <div className='col-4 m-0 p-0'>
            <div className='filter-background pt-3'>
                <h1 className='row justify-content-center title mb-4'>FILTROS</h1>
                <p className='row justify-content-center search-word m-0'>"palabra de búsqueda"</p>
                <p className='row justify-content-center results'>300 resultados</p>
                
                <div className='d-flex flex-column justify-content-center align-items-center bulgy-radios'>
                    <div className='d-flex flex-column align-items-start'>
                        <p className='row justify-content-center section m-0 p-0 mb-1'>Información general</p>
                        <RadioButtons content='Historias completadas' value='work-complete' name='fic-options' checked='false'></RadioButtons>
                        <RadioButtons content='Historias en progreso' value='work-in-progress' name='fic-options' checked='false'></RadioButtons>
                        <RadioButtons content='Todas las historias' value='all-works' name='fic-options' checked='true'></RadioButtons>
                    </div>
                </div>

                <div className='d-flex flex-column justify-content-center align-items-center bulgy-checkboxes mt-2 m-0 p-0'>
                    <div className='d-flex flex-column align-items-start'>
                        <p className='row justify-content-center align-items-center section m-0 p-0 mb-1'>Advertencias</p>
                        <CheckBoxes content='Violencia gráfica' id='violence' value='violence'></CheckBoxes>
                        <CheckBoxes content='Muerte de personaje' id='major-character-death' value='major-character-death'></CheckBoxes>
                        <CheckBoxes content='Drogas ilicitas' id='drugs' value='drugs'></CheckBoxes>
                        <CheckBoxes content='Daño de personaje' id='major-character-hurts' value='major-character-hurts'></CheckBoxes>
                        <CheckBoxes content='Contenido sexual' id='sex-content' value='sex-content'></CheckBoxes>
                        <CheckBoxes content='Sin advertencias' id='no-warnings' value='no-warnings'></CheckBoxes>
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center mt-2 m-0 p-0'>
                    <div className='d-flex flex-column align-items-start'>
                        <p className='row justify-content-center align-items-center section m-0 p-0 mb-1'>Categorias</p>
                        <div className="tomillo-input">
                            <p className='light-text'>Buscar cateogerías</p>
                            <input type="text"/>
                        </div>
                        <div className=' bulgy-checkboxes'>
                            <CheckBoxes content='Fantasía' id='fantasy' value='fantasy'></CheckBoxes>
                            <CheckBoxes content='Sci-fi' id='sci-fi' value='sci-fi'></CheckBoxes>
                            <CheckBoxes content='Fanfiction' id='fanfic' value='fanfic'></CheckBoxes>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filters;