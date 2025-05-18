import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InicioSesion (){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();


    const sendData=()=>{
        axios.post("/api/signinUser", 
            {
                email: email,
                password: password
            }
        ).then(resp => {
            if (resp.data.message === "Success") {
                alert("your username is " + resp.data.username);
                nav("/Card");
            } else {
                alert(resp.data.message);
            }
        }).catch(
            (error)=>{
                console.log(error)
            }
        )
    }

    return (
        <div>
            <div class="mb-3">
                <label for="inputEmail" className="form-label">Email</label>
                <input onChange={e=>setEmail(e.target.value)} type="email" className="form-control" id="inputEmail"/>
            </div>

            <div class="mb-3">
                <label for="inputPassword" className="form-label">Password</label>
                <input onChange={e=>setPassword(e.target.value)} type="password" className="form-control" id="inputPassword"/>
            </div>
            
            <button onClick={sendData} type="button" className="btn btn-primary">Submit</button>
        </div>
    );
}

export default InicioSesion;