import 'bootstrap/dist/css/bootstrap.css';
import TopFanfics from './TopFanfics';

function Welcome(){
    return(
        <div className="data-container">
            <div className="col-8">
                <h1 className="mt-5 mb-4 ">Escoge un fanfic y empieza a leer</h1>
                <p className="mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel dolor eros. Aenean sed mi nisi. Aliquam eu nisl eget libero lobortis posuere. Praesent semper, urna tristique porttitor tincidunt, velit enim vehicula nulla, vitae gravida ipsum nulla ut risus. Nam et turpis iaculis, congue eros tincidunt, fermentum elit.</p>
            </div>
            <div className="col-3">
                <button className="btn-main my-4">Comienza a leer</button>
            </div>

            <div className="col-8">
            <div className="content-slider">
                <div className="slider">
                    <div className="mask">
                    <ul>
                        <li className="anim1">
                            <div className="quote">
                                <img className='m-2' src="/img/9.jpg" alt="" />
                            "TomilloFics es un verdadero refugio para los amantes de los fanfics, donde cada historia está escrita con pasión y creatividad. ¡Una joya para la comunidad lectora!"
                            <div className="source">— ALI NOVAK</div>
                            </div>
                        </li>
                        <li className="anim2">
                        <div className="quote">"Cada relato en TomilloFics es una puerta a un universo emocionante. ¡La dedicación y el talento de sus autores brillan en cada palabra!"</div>
                        <div className="source">— LILENDER</div>
                        </li>
                        <li className="anim3">
                        <div className="quote">"Si buscas historias que atrapen tu corazón y te hagan sentir cada emoción, TomilloFics es el lugar perfecto. ¡Un rincón de imaginación sin límites!"</div>
                        <div className="source">— H.P. HATECRAFT</div>
                        </li>
                        <li className="anim4">
                        <div className="quote">"TomilloFics no solo ofrece fanfics, sino experiencias inolvidables a través de la escritura. ¡Cada historia es un viaje único y mágico!"</div>
                        <div className="source">— PATATA</div>
                        </li>
                        <li className="anim5">
                        <div className="quote">"En TomilloFics, las palabras cobran vida y los personajes encuentran un nuevo hogar. ¡Una comunidad que celebra la creatividad y el amor por las historias!"</div>
                        <div className="source">— TOMATO</div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className='TopFanfics row mt-5 justify-content-center text-center'>
                <h1 className="m-2">TOP Fanfics del momento</h1>
                <div className='row'>
                    <p className='num'>#1</p>
                    <TopFanfics />
                </div>
            </div>
    </div>
    );
}

export default Welcome;