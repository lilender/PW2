function CarruselIMG(props){
    return (
        <div className='col-2 align-self-end m-0 mb-1 p-0'>
            <span className='carrusel-img'>
                <img src={props.src} alt="" />
            </span>
        </div>
    );
}

export default CarruselIMG;