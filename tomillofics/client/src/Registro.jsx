import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//hooks
//useState: devuelve un valor de estado actual y una funcion que permite actualizarlo
//const [age, setAge] = useState(42);

function Registro (){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const nav = useNavigate();

    const sendData=()=>{

        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("password", password);
        data.append("image", image);

        /*axios.post("/api/createUser", 
            {
                name: name,
                email: email,
                password: password
            }
        )*/
        axios.post("/api/createUser", 
            data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(
            (resp)=>{
                if(resp.data.message === "Registered"){
                    alert("Registrado");
                    nav("/InicioSesion");
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
        <div>
            <div class="mb-3">
                <label for="inputName" className="form-label">Name</label>
                <input onChange={e=>setName(e.target.value)} type="text" className="form-control" id="inputName"/>
            </div>
        
            <div class="mb-3">
                <label for="inputEmail" className="form-label">Email</label>
                <input onChange={e=>setEmail(e.target.value)} type="email" className="form-control" id="inputEmail"/>
            </div>

            <div class="mb-3">
                <label for="inputPassword" className="form-label">Password</label>
                <input onChange={e=>setPassword(e.target.value)} type="password" className="form-control" id="inputPassword"/>
            </div>
            
            <div class="mb-3">
                <label for="inputFile" className="form-label">File</label>
                <input onChange={e=>setImage(e.target.files[0])} type="file" className="form-control" id="inputFile"/>
            </div>

            <button onClick={sendData} type="button" className="btn btn-primary">Submit</button>
        </div>
    );
}

export default Registro;