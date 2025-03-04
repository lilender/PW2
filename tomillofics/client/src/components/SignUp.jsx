import 'bootstrap/dist/css/bootstrap.css';
import PrimeNavBar from './PrimeNavBar';
import BTNMain from './BTNMain';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const nav = useNavigate();

    const sendData=()=>{

        if(password !== password2){
            alert("Las contraseñas no coinciden");
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
                    alert("Registrado");
                    nav("/LogIn");
                } else {
                    alert(resp.data.message)
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
                            <BTNMain onClick={sendData} content='Crear cuenta' type={1}></BTNMain>
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