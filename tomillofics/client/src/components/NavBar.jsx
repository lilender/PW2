import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import BTNMain from './BTNMain';
import { useState } from 'react';

function NavBar(){
    const storedImage = localStorage.getItem("profile_image");

    const profile_image = storedImage && storedImage !== "null" && storedImage !== "undefined"
    ? `data:image/jpg;base64,${storedImage}`
    : "/img/tomilloprofile.png";

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand"> 
                        <img src="/img/TomilloFics.png" alt="a"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse row justify-content-end" id="navbarSupportedContent">
                        <form className="d-flex col-9 p-2 ps-5">
                            <div className='row input-group'>
                                <input class="form-control col-10" type="search" placeholder="Search" aria-label="Search"/>
                                <BTNMain content='Buscar' type={3}></BTNMain>
                            </div>
                        </form>
                        <ul className="col-3 align-self-center p-0 m-0">
                            <div className='row justify-content-end'>
                                <li className="nav-item col-6 m-0 me-4 p-0 align-self-center">
                                    <Link to="" className="nav-link m-0 p-0 ms-5 row justify-content-end">Crear tu historia</Link>
                                </li>
                                <li className="nav-item col-md-4 offset-md-4 p-0 m-0 me-2">
                                <Link to="" className="nav-link nav-link-p m-0 p-0 align-self-center">
                                    <span className='profile-picture align-self-center me-2 p-1'>
                                        <img src={profile_image} alt="" />
                                    </span>
                                    Tu perfil</Link>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;