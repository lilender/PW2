import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import axios from 'axios';

//hooks
//useState: devuelve un valor de estado actual y una funcion que permite actualizarlo
//const [age, setAge] = useState(42);

function Registro (){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendData=()=>{
        axios.post("http://localhost:3001/createUser", 
            {
                name: name,
                email: email,
                password: password
            }
        ).then(
            ()=>{
                alert("data sent")
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
            
            <button onClick={sendData} type="button" className="btn btn-primary">Submit</button>
        </div>
    );
}

export default Registro;