import { Link } from 'react-router-dom';

function PrimeNavBar(){
    return (
        <nav className="prime-navbar navbar-expand-lg m-0">
            <div className="row m-0">
                <p className="col-2 p-3"> 
                    <img src="/img/PrimeNavBarLogo.png" alt="a"/>
                </p>
                <div className='col-10 p-3 align-self-center'>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse row justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
                            <li className="nav-item m-0">
                                <Link to="/LogIn" className="nav-link me-3">Iniciar Sesión</Link>
                            </li>
                            <li className="nav-item m-0">
                                <Link to="/SignUp" className="nav-link ms-2">Crear Cuenta</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default PrimeNavBar;