import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Registro from './Registro';
import InicioSesion from './InicioSesion';
import Carrusel from './Carrusel';
import App from './App';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

function Rutas () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}></Route>
                <Route path="/InicioSesion" element={<InicioSesion/>}></Route>
                <Route path="/Registro" element={<Registro/>}></Route>
                <Route path="/Carrusel" element={<Carrusel/>}></Route>
                <Route path="/LogIn" element={<LogIn/>}></Route>
                <Route path="/SignUp" element={<SignUp/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Rutas;