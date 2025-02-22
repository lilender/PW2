import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Registro from './Registro';
import InicioSesion from './InicioSesion';
import Carrusel from './Carrusel';
import App from './App';
function Rutas () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}></Route>
                <Route path="/Login" element={<InicioSesion/>}></Route>
                <Route path="/Registro" element={<Registro/>}></Route>
                <Route path="/Carrusel" element={<Carrusel/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Rutas;