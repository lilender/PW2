import 'bootstrap/dist/css/bootstrap.css';
import NavDropdown from 'react-bootstrap/NavDropdown';

function ChapterDrop(props){
    const theme = props.theme;
    return(
        <NavDropdown className={`mx-3 chapter-drop ` + {theme} + `d-flex justify-content-center`}
            id="nav-dropdown-dark-example"
            title="Seleccionar capítulo "
            menuVariant="dark"
        >
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2"> Another action </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        </NavDropdown>
    );
}

export default ChapterDrop;