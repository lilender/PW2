import PrimeNavBar from './PrimeNavBar';
import BTNMain from './BTNMain';
import BrownLine from './BrownLine';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function LogIn(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const nav = useNavigate();

    const sendData=()=>{
        if(username === '' || password === ''){
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
                        text: 'Por favor llene todos los campos'
                    });
            return;
        }

        axios.post("/api/loginUser", 
            {
                username: username,
                password: password
            }
        ).then(resp => {
            if (resp.data.message === "Success") {
                localStorage.setItem("iduser", resp.data.iduser);
                localStorage.setItem("username", resp.data.username);
                localStorage.setItem("profile_image", resp.data.profile_image);
                localStorage.setItem("mode_pref", resp.data.mode_pref);
                nav("/Dashboard");
            } else {
                if(resp.data.message === "ER_WRONG_PASS"){
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
                        text: "Contraseña incorrecta"});
                } else if (resp.data.message === "ER_NOT_FOUND"){
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
                        text:'Usuario no encontrado'
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
        }).catch(
            (error)=>{
                console.log(error)
            }
        )
    }

    const toSignUp=()=>{
        nav("/SignUp");
    }

    return (
        <div className='back-color'>
            <PrimeNavBar />
            <div className='data-container px-5'>
                <div className='row align-items-center px-5'>
                    <div className='asset-container col-6'>
                        <img className="m-2" src="/img/asset-logo.png" alt="" />
                    </div>
                    <div className='col-6 px-5'>
                        <h2 className='m-4'>Inicia Sesión</h2>
                        <div className="tomillo-input m-4">
                            <p>Ingrese nombre de usuario</p>
                            <input onChange={e=>setUsername(e.target.value)} type="text" />
                        </div>
                        <div className="tomillo-input m-4">
                            <p>Ingrese contraseña</p>
                            <input onChange={e=>setPassword(e.target.value)} type="password" />
                        </div>
                        <div className='m-4'>
                            <BTNMain onClick={sendData} content='Iniciar sesión' type={'1'}></BTNMain>
                        </div>
                        <div className='row justify-content-center text-center'>
                            <div className='w-75 m-4'>
                                <BrownLine type={'1'}></BrownLine>
                            </div>
                            <p className='mt-4 mb-0'>¿No tienes una cuenta? ¡Registrate ahora!</p>
                            <div className='m-4 mt-0 w-50'>
                                <BTNMain onClick={toSignUp} content='Crear cuenta' type={'2'}></BTNMain>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;