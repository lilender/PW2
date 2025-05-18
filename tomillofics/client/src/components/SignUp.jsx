import 'bootstrap/dist/css/bootstrap.css';
import PrimeNavBar from './PrimeNavBar';
import BTNMain from './BTNMain';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function SignUp(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const nav = useNavigate();

    const sendData=()=>{

        if(username === '' || email === '' || password === '' || password2 === ''){
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
        
        if(username.length < 4){
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
                text: 'Nombre de usuario muy corto'
            });
            return;
        }
        if(email.length < 4){
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
                text: 'Correo muy corto'
            });
            return;
        }
        if(!email.includes('@')){
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
                text: 'Correo inválido'
            });
            return;
        }
        if(password.length < 4){
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
                text: 'Contraseña muy corta'
            });
            return;
        }
        if(password !== password2){
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
                text: 'Las contraseñas no coinciden'
            });
            return;
        }

        const data = new FormData();
        data.append("username", username);
        data.append("email", email);
        data.append("password", password);
        
        axios.post("http://localhost:3001/createUser", 
            data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(
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
                    nav("/LogIn");
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
        ).catch(
            (error)=>{
                console.log(error)
            }
        )
    }

    return (
        <div className='back-color'>
            <PrimeNavBar />
            <div className='data-container px-5'>
                <div className='row align-items-center px-5'>
                    <div className='col-6 px-5'>
                        <h2 className='m-4'>Únete al club de lectura</h2>
                        <div className="tomillo-input m-4">
                            <p>Ingrese nombre de usuario</p>
                            <input onChange={e=>setUsername(e.target.value)} type="text" />
                        </div>
                        <div className="tomillo-input m-4">
                            <p>Ingrese correo electrónico</p>
                            <input onChange={e=>setEmail(e.target.value)} type="text" />
                        </div>
                        <div className="tomillo-input m-4">
                            <p>Contraseña</p>
                            <input onChange={e=>setPassword(e.target.value)} type="password" />
                        </div>
                        <div className="tomillo-input m-4">
                            <p>Verifica que sean iguales</p>
                            <input onChange={e=>setPassword2(e.target.value)} type="password" />
                        </div>
                        <div className='m-4'>
                            <BTNMain onClick={sendData} content='Crear cuenta' type={'1'}></BTNMain>
                        </div>
                    </div>
                    <div className='asset-container col-6'>
                        <img className="m-2" src="/img/asset-logo.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;