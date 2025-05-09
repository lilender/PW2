import 'bootstrap/dist/css/bootstrap.css';
import BTNMain from './BTNMain';
import Swal from 'sweetalert2';
import axios from 'axios';

function UserBanner({profileImage,userData, changed,type}){
    const iduser = localStorage.getItem("iduser");

    if(type === '1'){
        
        const handleForm = () => {
            Swal.fire({
                customClass: {
                    confirmButton: "btn-main",
                    cancelButton: "btn-sec",
                    title: 'title',
                },
                color: '#4C0B0B',
                background: '#EACDBD',
                title: 'Editar perfil',
                html: `
                    <div class="tomillo-input m-4 mb-3">
                        <p for="inputName" class="">Nombre de usuario</p>
                        <input type="text" id="inputName" class="userBanner form-control" value="${userData.username || ''}"/>
                    </div>
                    <div class="tomillo-input m-4 mb-3">
                        <p for="inputEmail" class="">Correo electrónico</p>
                        <input type="email" id="inputEmail" class="userBanner form-control" value="${userData.email || ''}" placeholder="Dejar vacío para no cambiar"/>
                    </div>
                    <div class="tomillo-input m-4 mb-3">
                        <p for="inputPassword" class="">Nueva contraseña</p>
                        <input type="password" id="inputPassword" class="userBanner form-control" placeholder="Dejar vacío para no cambiar"/>
                    </div>
                    <div class="tomillo-input m-4 mb-3">
                        <p for="inputPassword2" class="">Confirmar contraseña</p>
                        <input type="password" id="inputPassword2" class="userBanner form-control" placeholder="Dejar vacío para no cambiar"/>
                    </div>
                    <div class="tomillo-input m-4 mb-3">
                        <p for="inputFile" class="">Imagen de perfil</p>
                        <input type="file" id="inputFile" class="userBanner form-control"/>
                    </div>
                    <div class="tomillo-input d-flex flex-column justify-content-center bulgy-radios m-0 mb-3 p-0">
                        <p class="ms-4">Modo</p>
                        <div class="row justify-content-start m-0 p-0 ms-4 mb-1">
                            <label class="d-flex justify-content-center align-items-center m-1 p-0 w-25">
                                <input type="radio" class="userBanner" name="mode" value="0" id="dark" ${String(userData.mode_pref) === '0' ? 'checked' : ''}>
                                <span for="dark" class="radio m-1"></span>
                                <span for="dark" class="label categories ps-1">Oscuro</span>
                            </label>
                            <label class="d-flex justify-content-center align-items-center m-1 p-0 w-25">
                                <input type="radio" class="userBanner" name="mode" value="1" id="light" ${String(userData.mode_pref) === '1' ? 'checked' : ''}>
                                <span for="light" class="radio m-1"></span>
                                <span for="light" class="label categories ps-1">Claro</span>
                            </label>
                        </div>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                didOpen: () => {
                    const inputs = document.querySelectorAll('.userBanner');
                    inputs.forEach(input => {
                        input.addEventListener('input', () => {
                            Swal.resetValidationMessage();
                        });
                    });
                },
                preConfirm: () => {
                    const name = document.getElementById('inputName').value;
                    const email = document.getElementById('inputEmail').value;
                    const password = document.getElementById('inputPassword').value;
                    const password2 = document.getElementById('inputPassword2').value;
                    const file = document.getElementById('inputFile').files[0];
                    const mode = document.querySelector('input[name="mode"]:checked')?.value;
            
                    if (!name || name.length < 4) {
                        Swal.showValidationMessage({
                            color: '#4C0B0B',
                            background: '#EACDBD',
                            iconColor: '#4C0B0B',
                            customClass: {
                                confirmButton: "btn-main",
                                cancelButton: "btn-sec",
                                title: 'title',
                            },
                            icon: 'warning',
                            text: 'El nombre de usuario es obligatorio y debe tener al menos 4 caracteres.'
                        });
                        return false;
                    }
                    if (email && (email.length < 4 || !email.includes('@'))) {
                        Swal.showValidationMessage({
                            color: '#4C0B0B',
                            background: '#EACDBD',
                            iconColor: '#4C0B0B',
                            customClass: {
                                confirmButton: "btn-main",
                                cancelButton: "btn-sec",
                                title: 'title',
                            },
                            icon: 'warning',
                            text: 'Correo inválido'
                        });
                        return false;
                    }
                    if (password && password.length < 4) {
                        Swal.showValidationMessage({
                            color: '#4C0B0B',
                            background: '#EACDBD',
                            iconColor: '#4C0B0B',
                            customClass: {
                                confirmButton: "btn-main",
                                cancelButton: "btn-sec",
                                title: 'title',
                            },
                            icon: 'warning',
                            text: 'Contraseña muy corta'
                        });
                        return false;
                    }
                    if (password && password !== password2) {
                        Swal.showValidationMessage({
                            color: '#4C0B0B',
                            background: '#EACDBD',
                            iconColor: '#4C0B0B',
                            customClass: {
                                confirmButton: "btn-main",
                                cancelButton: "btn-sec",
                                title: 'title',
                            },
                            icon: 'warning',
                            text: 'Las contraseñas no coinciden'
                        });
                        return false;
                    }
                    if (file) {
                        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                        if (!validImageTypes.includes(file.type)) {
                            Swal.showValidationMessage({
                                color: '#4C0B0B',
                                background: '#EACDBD',
                                iconColor: '#4C0B0B',
                                customClass: {
                                    confirmButton: "btn-main",
                                    cancelButton: "btn-sec",
                                    title: 'title',
                                },
                                icon: 'warning',
                                text: 'Formato de imagen no válido'
                            });
                            return false;
                        }
                        if (file.size > 16777215) { // MEDIUMTEXT = 16MB
                            Swal.showValidationMessage({
                                color: '#4C0B0B',
                                background: '#EACDBD',
                                iconColor: '#4C0B0B',
                                customClass: {
                                    confirmButton: "btn-main",
                                    cancelButton: "btn-sec",
                                    title: 'title',
                                },
                                icon: 'warning',
                                text: 'La imagen es demasiado grande (máx. 16MB)'
                            });
                            return false;
                        }
            
                        return new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
            
                            reader.onload = function (e) {
                                const img = new Image();
                                img.src = e.target.result;
            
                                img.onload = function () {
                                    if (img.width !== img.height) {
                                        Swal.showValidationMessage({
                                            color: '#4C0B0B',
                                            background: '#EACDBD',
                                            iconColor: '#4C0B0B',
                                            customClass: {
                                                confirmButton: "btn-main",
                                                cancelButton: "btn-sec",
                                                title: 'title',
                                            },
                                            icon: 'info',
                                            text: 'La imagen debe ser cuadrada (mismo ancho y alto).'
                                        });
                                        resolve(false);
                                    } else {
                                        resolve({ name, email, password, file, mode });
                                    }
                                };
                            };
                        });
                    }
            
                    return { name, email, password, file, mode };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append('username', result.value.name);
                    formData.append('email', result.value.email);
                    if (result.value.password){
                        formData.append('password', result.value.password);
                    }else{
                        formData.append('password', null);
                    }
                    formData.append('iduser', iduser);
                    if(result.value.file){
                        formData.append('image', result.value.file);
                    } else{
                        formData.append('image', null);
                    }
                    formData.append('mode_pref', result.value.mode);
                    
                    axios.post('http://localhost:3001/updateUser', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }).then(
                        (resp)=>{
                            if(resp.data.message === "Success"){
                                Swal.fire({
                                    color: '#4C0B0B',
                                    background: '#EACDBD',
                                    iconColor: '#9B4444',
                                    customClass: {
                                        confirmButton: "btn-main",
                                        cancelButton: "btn-sec",
                                        title: 'title',
                                    },
                                    icon: 'success',
                                    title: 'Éxito',
                                    text: 'Registrado'
                                });
                                changed(true);
                            } else {
                                if (resp.data.message === 'ER_DUP_USERNAME') {
                                    Swal.fire({
                                        color: '#4C0B0B',
                                        background: '#EACDBD',
                                        iconColor: '#4C0B0B',
                                        customClass: {
                                            confirmButton: "btn-main",
                                            cancelButton: "btn-sec",
                                            title: 'title',
                                        },
                                        icon: 'warning',
                                        text: 'El nombre de usuario ya existe'
                                    });
                                } else if (resp.data.message === 'ER_DUP_EMAIL') {
                                    Swal.fire({
                                        color: '#4C0B0B',
                                        background: '#EACDBD',
                                        iconColor: '#4C0B0B',
                                        customClass: {
                                            confirmButton: "btn-main",
                                            cancelButton: "btn-sec",
                                            title: 'title',
                                        },
                                        icon: 'warning',
                                        text: 'El correo ya existe'
                                    });
                                }
                                else {
                                    Swal.fire({
                                        color: '#4C0B0B',
                                        background: '#EACDBD',
                                        iconColor: '#4C0B0B',
                                        customClass: {
                                            confirmButton: "btn-main",
                                            cancelButton: "btn-sec",
                                            title: 'title',
                                        },
                                        icon: 'error',
                                        text: 'Error desconocido. Contacte a soporte'
                                    });
                                }
                            }
                        }
                    ).catch(error => {
                        Swal.fire('Error', 'Algo salió mal', 'error');
                        console.error(error);
                    });
                }
            });
        };

        return(
            <div className='row justify-content-center banner-img p-0 m-0'>
                <img className="background" src="/img/banner.png" alt="" />
                <div className='z-1 position-absolute p-5 pt-0 rounded-1'>
                    <div className='p-0 px-5'>
                        <div className='row justify-content-center align-items-center p-5 pt-2'>
                            <div className='col-3 p-5 py-0 pe-5 m-0 algin-self-center'>
                                <span className='profile-picture align-self-center m-5 p-2'>
                                    <img src={profileImage} alt="" />
                                </span>
                            </div>
                            <div className='col-7 align-self-center m-0 ps-4'>
                                <h1 className='username m-0'>{userData.username}</h1>
                                <h2 className='number-fics mb-5'>{userData.written_fics} historias publicadas</h2>
                                <p className='text mb-1'>{userData.saved_fics} historias guardadas como favoritos</p>
                                <p className='text m-0'>Escribiendo historias desde {new Date(userData.created).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                    }) }</p>
                            </div>
                            <div className='col-2 align-self-end m-0 p-0'>
                                <BTNMain onClick={handleForm} content='Editar perfil' type={'1'}></BTNMain>
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
                                    <img src={profileImage} alt="" />
                                </span>
                            </div>
                            <div className='col-9 align-self-center m-0 ps-4'>
                                <h1 className='username m-0'>{userData.username}</h1>
                                <h2 className='number-fics mb-5'>{userData.written_fics} historias publicadas</h2>
                                <p className='text m-0'>Escribiendo historias desde {new Date(userData.created).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                    }) }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserBanner;