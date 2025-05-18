import 'bootstrap/dist/css/bootstrap.css';

function Carusel(){
    return (
        <div className="quote row align-items-center">
            <div className='col-2 img-container'>
                <img className='mr-5' src="/img/9.jpg" alt="" />
            </div>
            <div className='col-10 m-0 p-0'>
                "TomilloFics es un verdadero refugio para los amantes de los fanfics, donde cada historia está escrita con pasión y creatividad. ¡Una joya para la comunidad lectora!"
                <div className="source p-0">— ALI NOVAK</div>
            </div>
        </div>
    );
}

export default Carusel;