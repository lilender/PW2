import { Link } from 'react-router-dom';
import BTNMain from './BTNMain';
import { useNavigate } from 'react-router-dom';

function NavBar({profileImage}){
    
    const nav = useNavigate();

    const iduser = localStorage.getItem("iduser");

    if(!profileImage ){
        const storedImage = localStorage.getItem("profile_image");
        profileImage = storedImage && storedImage !== "null" && storedImage !== "undefined"
        ? `data:image/jpg;base64,${storedImage}`
        : "/img/tomilloprofile.png";
    }

    const toSearch=()=>{
        const searchValue = document.querySelector("input[type='search']").value;
        nav(`/Search?text=${searchValue}`);
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className="navbar-brand"> 
                        <img src="/img/TomilloFics.png" onClick={()=>nav("/Dashboard")} alt="Logo"/>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse row justify-content-end" id="navbarSupportedContent">
                        <div className="d-flex col-9 p-2 ps-5">
                            <div className='row input-group'>
                                <input class="form-control col-12" type="search" aria-label="Search"/>
                                <BTNMain onClick={toSearch} type='5' content="/img/buscar.png"></BTNMain>
                            </div>
                        </div>
                        <ul className="col-3 align-self-center p-0 m-0">
                            <div className='row justify-content-end m-0 p-0'>
                                <li className="nav-item col-6 m-0 me-4 p-0 align-self-center">
                                    <Link to="/Fic" className="nav-link m-0 p-0 ms-5 row justify-content-end">Crear tu historia</Link>
                                </li>
                                <li className="nav-item col-md-4 offset-md-4 p-0 m-0 me-2">
                                <Link to={`/Profile/${encodeURIComponent(iduser)}`} className="nav-link nav-link-p m-0 p-0 align-self-center">
                                    <span className='profile-picture align-self-center me-2 p-1'>
                                        <img src={profileImage} alt="" />
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