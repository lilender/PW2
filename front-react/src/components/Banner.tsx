import 'bootstrap/dist/css/bootstrap.css';

function Banner(){
    return(
        <>
            <img className="asset m-2 col-6 z-3 position-absolute" src="/img/asset1.png" alt="" />
            <div className="banner-img">
                <img className="background" src="/img/banner.png" alt="" />
                <div className="row">
                    <img className="logo m-2 col-6" src="/img/TomilloFics.png" alt="" />
                </div>
            </div>
        </>
    );
}

export default Banner;