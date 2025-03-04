import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Registro from './Registro';
import InicioSesion from './InicioSesion';
import Carrusel from './Carrusel';
import App from './AppTest';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Ejemplo from './Ejemplo';

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
                <Route path="/Card" element={<Ejemplo/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Rutas;