import 'bootstrap/dist/css/bootstrap.css';
import BTNMain from './BTNMain';

function UserBanner(props){
    const storedImage = localStorage.getItem("profile_image");

    const profile_image = storedImage && storedImage !== "null" && storedImage !== "undefined"
    ? `data:image/jpg;base64,${storedImage}`
    : "/img/tomilloprofile.png";

    if(props.type == 1){
        return(
            <div className='row justify-content-center banner-img p-0 m-0'>
                <img className="background" src="/img/banner.png" alt="" />
                <div className='z-1 position-absolute p-5 pt-0 rounded-1'>
                    <div className='p-0 px-5'>
                        <div className='row justify-content-center align-items-center p-5 pt-2'>
                            <div className='col-3 p-5 py-0 pe-5 m-0 algin-self-center'>
                                <span className='profile-picture align-self-center m-5 p-2'>
                                    <img src={profile_image} alt="" />
                                </span>
                            </div>
                            <div className='col-7 align-self-center m-0 ps-4'>
                                <h1 className='username m-0'>Lilender</h1>
                                <h2 className='number-fics mb-5'>2 historias publicadas</h2>
                                <p className='text mb-1'>25 historias guardadas como favoritos</p>
                                <p className='text m-0'>Escribiendo historias desde 1999</p>
                            </div>
                            <div className='col-2 align-self-end m-0 p-0'>
                                <BTNMain content='Editar perfil' type={1}></BTNMain>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }else{
        return(
            <div className='row justify-content-center banner-img p-0 m-0'>
                <img className="background" src="/img/banner.png" alt="" />
                <div className='z-1 position-absolute p-5 pt-0 rounded-1'>
                    <div className='p-0 px-5'>
                        <div className='row justify-content-center align-items-center p-5 pt-2'>
                            <div className='col-3 p-5 py-0 pe-5 m-0 algin-self-center'>
                                <span className='profile-picture align-self-center m-5 p-2'>
                                    <img src={profile_image} alt="" />
                                </span>
                            </div>
                            <div className='col-9 align-self-center m-0 ps-4'>
                                <h1 className='username m-0'>Lilender</h1>
                                <h2 className='number-fics mb-5'>2 historias publicadas</h2>
                                <p className='text m-0'>Escribiendo historias desde 1999</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserBanner;