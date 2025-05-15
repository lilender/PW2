import {BrowserRouter, Routes, Route} from 'react-router-dom';
//official
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Search from './components/Search';
import Profile from './components/UserOnline';
import FicContent from './components/FicContent';
import { FicProvider } from "./components/FicContext";
import NewFic from './components/NewFic';
import Chapter from './components/Chapter';
//testing
//import App from './App';
import Registro from './Registro';
import InicioSesion from './InicioSesion';
import Ejemplo from './Ejemplo';
import WriteChapter from './components/WriteChapter';

function Rutas () {
    return (
        <FicProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome/>}></Route>
                    <Route path="/Dashboard" element={<Dashboard/>}></Route>
                    <Route path="/SignUp" element={<SignUp/>}></Route>
                    <Route path="/LogIn" element={<LogIn/>}></Route>
                    <Route path="/Search" element={<Search/>}></Route>
                    <Route path="/Profile/:id" element={<Profile/>}></Route>
                    <Route path="/Fic" element={<NewFic/>}></Route>
                    <Route path="/FicEdit/:id" element={<NewFic/>}></Route>
                    <Route path="/Fic/:id" element={<FicContent/>}></Route>
                    <Route path="/Chapter/:id" element={<WriteChapter/>}></Route>
                    <Route path="/Chapter/:idFic/:idChapter" element={<Chapter/>}></Route>

                    <Route path="/InicioSesion" element={<InicioSesion/>}></Route>
                    <Route path="/Registro" element={<Registro/>}></Route>
                    <Route path="/Card" element={<Ejemplo/>}></Route>

                </Routes>
                <Footer></Footer>
            </BrowserRouter>
        </FicProvider>
    );
}

export default Rutas;