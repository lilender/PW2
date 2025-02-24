import 'bootstrap/dist/css/bootstrap.css';
import PrimeNavBar from './PrimeNavBar';
import Input from './Input';
import BTNMain from './BTNMain';

function SignIn(){
    return (
        <>
            <PrimeNavBar />
            <div className='data-container px-5'>
                <div className='row align-items-center px-5'>
                    <div className='col-6 px-5'>
                        <h2 className='m-4'>Únete al club de lectura</h2>
                        <Input content="Ingrese nombre de usuario" type={1}/>
                        <Input content="Contraseña" type={2}/>
                        <Input content="Verifica que sean iguales" type={2}/>
                        <Input content="Ingrese correo electrónico" type={1}/>
                        <div className='m-4'>
                            <BTNMain content='Crear cuenta' type={1}></BTNMain>
                        </div>
                    </div>
                    <div className='asset-container col-6'>
                        <img className="m-2" src="/img/asset-logo.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;