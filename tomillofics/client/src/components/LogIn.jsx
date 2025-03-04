import 'bootstrap/dist/css/bootstrap.css';
import PrimeNavBar from './PrimeNavBar';
import Input from './Input';
import BTNMain from './BTNMain';
import BrownLine from './BrownLine';

function LogIn(){
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
                        <Input content="Ingrese nombre de usuario" type={1}/>
                        <Input content="Ingrese contraseña" type={2}/>
                        <div className='m-4'>
                            <BTNMain content='Iniciar sesión' type={1}></BTNMain>
                        </div>
                        <div className='row justify-content-center text-center'>
                            <div className='w-75 m-4'>
                                <BrownLine></BrownLine>
                            </div>
                            <p className='mt-4 mb-0'>¿No tienes una cuenta? ¡Registrate ahora!</p>
                            <div className='m-4 mt-0 w-50'>
                                <BTNMain content='Crear cuenta' type={2}></BTNMain>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;