import 'bootstrap/dist/css/bootstrap.css';

const user = {
    nombre: "Mauricio",
    edad: "20 casi 21",
    foto: "https://media.gettyimages.com/id/1164046558/es/foto/beb%C3%A9-oveja-de-cerca.jpg?s=612x612&w=gi&k=20&c=0YNIqdrmclc2Of1MMWLxhthDIwvoWzhN68_t3AY3qkU=",
    login: false
}

function Boton () {
    function login () {
        alert("Ingresando como " + user.nombre)
        user.login = true
    }
    return (
        <button onClick={login} type="button" className="btn btn-primary">Ingresar como {user.nombre}</button>
    );
}

function Ejemplo() {
    return (
        <div className="card" style={{width: "18rem"}}>
            <img src={user.foto} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{user.nombre}</h5>
                <p className="card-text">{user.nombre} tiene {user.edad} años y {user.login ? "tiene usuario" : "no tiene usuario" }</p>
            </div>
            <Boton />
        </div>
    );
}



export default Ejemplo;