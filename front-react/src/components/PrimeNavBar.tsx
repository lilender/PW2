import 'bootstrap/dist/css/bootstrap.css';

function PrimeNavBar(){
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"> 
                    <img src="/img/PrimeNavBarLogo.png" alt="a"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse row justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
                        <li className="nav-item m-2">
                            <a className="nav-link active" aria-current="page" href="#">Iniciar Sesión</a>
                        </li>
                        <li className="nav-item m-2">
                            <a className="nav-link" href="#">Crear cuenta</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default PrimeNavBar;