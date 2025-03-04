import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import { useState } from 'react';

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
    useEffect(() => {
        /*traer info de la base de datos al inicio */
        axios.get("http://localhost:3001/getUser")
        .then(resp => {
            if(resp.data.message) {
                alert(resp.data.message)
            } else {
                setUsers(resp.data)
            }
        })
    }, [/*Aqui se puede dejar vacio para que solo se renderice una vez, o podemos meterle variables, entonces cuando estas cambien se activa este effect */])

    return (
        users.map((user, key) => {
            return (
                <div className="card" style={{width: "18rem"}}>
                    <img src={'data:image/jpg;base64,' + user.profile_image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{user.username}</h5>
                        <p className="card-text">{user.email}</p>
                    </div>
                    <Boton />
                </div>
            )
        })
    );
}



export default Ejemplo;