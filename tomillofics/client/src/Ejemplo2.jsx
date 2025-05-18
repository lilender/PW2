import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useEffect } from 'react';
//import axios from 'axios';

//use search params
///perfil?id=13&nombre=xxx
//use params
///perfil/id

function Modificar({ver, id, userInfo, hideFun, modFun}){
    const [name, setName] = useState(userInfo.username);
    const [email, setEmail] = useState(userInfo.email);

    useEffect(
        ()=>{
            setName(userInfo.username);
            setEmail(userInfo.email);
        }
        ,[userInfo]
    );
    
    /*const sendData=()=>{

        const data = new FormData();
        data.append("name", name);
        data.append("email", email);
        data.append("iduser", id);

        axios.post("/api/modifyUserTest", 
            data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(
            (resp)=>{
                if(resp.data.message === "Success"){
                    alert("Modificado");
                } else {
                    alert(resp.data.message)
                }
            }
        ).catch(
            (error)=>{
                console.log(error)
            }
        )
    }*/

    if (ver && userInfo.iduser === id){
        return (

            <div id={id}>
                <div class="mb-3">
                    <label for="inputName" className="form-label">Name</label>
                    <input value={name} onChange={e=>setName(e.target.value)} type="text" className="form-control" id="inputName"/>
                </div>
            
                <div class="mb-3">
                    <label for="inputEmail" className="form-label">Email</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="form-control" id="inputEmail"/>
                </div>
    
                <button onClick={()=>modFun(name, email, userInfo.iduser)} type="button" className="btn btn-primary">Submit</button>
                <button onClick={()=>hideFun(false)} type='button' className='btn btn-secondary'>Cancelar</button>

            </div>
    
        )
    }
    
}

export default Modificar;