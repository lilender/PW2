import NavDropdown from 'react-bootstrap/NavDropdown';

function ChapterDrop(props){
    const theme = props.theme;
    return(
        <NavDropdown className={`mx-3 chapter-drop ` + {theme} + `d-flex justify-content-center`}
            id="nav-dropdown-dark-example"
            title="Seleccionar capítulo "
            menuVariant="dark"
        >
            {props.chapters.map((chapter) => (
                <NavDropdown.Item onClick={ () => {props.chapterChange(parseInt(chapter.id))} }>{ ` ${chapter.id}. ` + chapter.title}</NavDropdown.Item>
            ))}
        </NavDropdown>
    );
}

export default ChapterDrop;