import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

function PrimeNavBar(){
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand"> 
                    <img src="/img/PrimeNavBarLogo.png" alt="a"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse row justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
                        <li className="nav-item m-2">
                            <Link to="/LogIn" className="nav-link">Iniciar Sesión</Link>
                        </li>
                        <li className="nav-item m-2">
                            <Link to="/SignUp" className="nav-link">Crear Cuenta</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default PrimeNavBar;