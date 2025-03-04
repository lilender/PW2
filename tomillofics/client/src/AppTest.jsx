import './index.css';
import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Registro from './Registro';
import InicioSesion from './InicioSesion';
import { Link } from 'react-router-dom';

function App() {
    const [num, setNum] = useState(0)

    const handleClick = () =>{
        num === 0 ? setNum(1) : setNum(0)
    }

    return (
        <div className="App">
            <header className={num === 0 ? "App-header-light" : "App-header-dark"}>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-6'>
                            <h1>Registro</h1>
                            <Registro />
                        </div>
                        <div className='col-6'>
                            <h1>Iniciar Sesion</h1>
                            <InicioSesion />
                        </div>
                    </div>
                </div>
                <br />
                <button onClick={handleClick}>
                    {num === 0 ? "dark" : "light"}
                </button>
                <Link to="/Carrusel">IR A CARRUSEL</Link>
            </header>
        </div>
    );
}

export default App;
