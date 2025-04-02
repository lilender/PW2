import 'bootstrap/dist/css/bootstrap.css';
import BTNMain from './BTNMain';
import Swal from 'sweetalert2';
import axios from 'axios';

function UserBanner({profileImage,userData, changed,type}){
    const iduser = localStorage.getItem("iduser");

    if(type === '1'){
        
        const handleForm = () => {
            Swal.fire({
                title: 'Editar perfil',
                html: `
                    <div class="mb-3">
                        <label for="inputName" class="form-label">Nombre de usuario</label>
                        <input type="text" id="inputName" class="form-control" value="${userData.username || ''}"/>
                    </div>
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label">Correo electrónico</label>
                        <input type="email" id="inputEmail" class="form-control" value="${userData.email || ''}" placeholder="Dejar vacío para no cambiar"/>
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="form-label">Nueva contraseña</label>
                        <input type="password" id="inputPassword" class="form-control" placeholder="Dejar vacío para no cambiar"/>
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword2" class="form-label">Confirmar contraseña</label>
                        <input type="password" id="inputPassword2" class="form-control" placeholder="Dejar vacío para no cambiar"/>
                    </div>
                    <div class="mb-3">
                        <label for="inputFile" class="form-label">Imagen de perfil</label>
                        <input type="file" id="inputFile" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Modo</label>
                        <div>
                            <input type="radio" name="mode" value="0" id="dark" ${String(userData.mode_pref) === '0' ? 'checked' : ''}/> <label for="dark">Oscuro</label>
                            <input type="radio" name="mode" value="1" id="light" ${String(userData.mode_pref) === '1' ? 'checked' : ''}/> <label for="light">Claro</label>
                        </div>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                preConfirm: () => {
                    const name = document.getElementById('inputName').value;
                    const email = document.getElementById('inputEmail').value;
                    const password = document.getElementById('inputPassword').value;
                    const password2 = document.getElementById('inputPassword2').value;
                    const file = document.getElementById('inputFile').files[0];
                    const mode = document.querySelector('input[name="mode"]:checked')?.value;
        
                    if (!name || name.length < 4) {
                        Swal.showValidationMessage('El nombre de usuario es obligatorio y debe tener al menos 4 caracteres.');
                        return;
                    }
                    if (email && (email.length < 4 || !email.includes('@'))) {
                        Swal.fire("Correo inválido");
                        return;
                    }
                    if (password && password.length < 4) {
                        Swal.fire("Contraseña muy corta");
                        return;
                    }
                    if (password && password !== password2) {
                        Swal.fire("Las contraseñas no coinciden");
                        return;
                    }
                    if (file) {
                        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                        if (!validImageTypes.includes(file.type)) {
                            Swal.fire("Formato de imagen no válido");
                            return;
                        }
                        if (file.size > 16777215) { // MEDIUMTEXT = 16MB
                            Swal.fire("La imagen es demasiado grande (máx. 16MB)");
                            return;
                        }
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
                                Swal.fire("Registrado");
                                changed(true);
                            } else {
                                if (resp.data.message === 'ER_DUP_USERNAME') {
                                    Swal.fire("El nombre de usuario ya existe");
                                } else if (resp.data.message === 'ER_DUP_EMAIL') {
                                    Swal.fire("El correo ya existe");
                                }
                                else {
                                    Swal.fire("Error desconocido. Contacte a soporte");
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
                                <h2 className='number-fics mb-5'>2 historias publicadas</h2>
                                <p className='text mb-1'>25 historias guardadas como favoritos</p>
                                <p className='text m-0'>Escribiendo historias desde 1999</p>
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