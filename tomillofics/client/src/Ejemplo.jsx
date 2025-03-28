import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Modificar from './Ejemplo2'

function Boton () {
    //function login () {
        //alert("Ingresando como " + user.nombre)
        //user.login = true
    //}
    //return (
        //<button onClick={login} type="button" className="btn btn-primary">Ingresar como {user.nombre}</button>
    //);
}

function Ejemplo() {
    const [users, setUsers] = useState([]);
    const [ver, setVer] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [deleted, setDeleted] = useState(false);

    const hide = (valor) => {
        setVer(valor);
    }

    const modificar = (nombre, correo, iduser) => {
        axios.put(`http://localhost:3001/modificar/${iduser}`,
            {
                newName: nombre,
                newCorreo: correo
            }
        ).then(
            (resp) => {
                if(resp.data.message === "Success"){
                    alert("el usuario se modificó");
                    setVer(false);
                } else {
                    alert("error");
                }
            }
        )
    }

    const eliminar = (iduser) => {
        axios.delete(`http://localhost:3001/eliminar/${iduser}`,{}
        ).then(
            (resp) => {
                if(resp.data.message === "Success"){
                    alert("el usuario se borró");
                    setDeleted(true);
                } else {
                    alert("error");
                }
            }
        )
    }

    useEffect(() => {
        /*traer info de la base de datos al inicio */
        axios.get("http://localhost:3001/getUser")
        .then(resp => {
            if(resp.data.message) {
                setUsers([]);
                alert(resp.data.message)
            } else {
                setUsers(resp.data)
            }
        })
        setDeleted(false);
    }, [ver,deleted/*Aqui se puede dejar vacio para que solo se renderice una vez, o podemos meterle variables, entonces cuando estas cambien se activa este effect */])

    return (
        users.map((user, key) => {
            return (
                <div className="card" style={{width: "18rem"}}>
                    <img src={'data:image/jpg;base64,' + user.profile_image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{user.username}</h5>
                        <p className="card-text">{user.email}</p>
                        {user.iduser}
                    </div>
                    <button onClick={()=>{setVer(true); setUserInfo(user)}} type='button' className='btn btn-primary'>Modificar</button>
                    <button onClick={()=>eliminar(user.iduser)} type='button' className='btn btn-danger'>Eliminar</button>
                    <Boton />
                    <Modificar hideFun={hide} ver={ver} id={user.iduser} userInfo={userInfo} modFun={modificar}/>
                </div>
            )
        })
    );
}



export default Ejemplo;