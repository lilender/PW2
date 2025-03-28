import 'bootstrap/dist/css/bootstrap.css';

function CarruselData(props){
    return (
        <div className='col-6 carrusel-data m-0 p-0 pt-5 px-4'>
            <div className='row'>
                <div className='carrusel-data-img col-2 align-self-center'>
                    <span className='profile-picture'>
                        <img src={props.src} alt="" />
                    </span>
                </div>
                <div className='col-10 align-self-end py-2 px-0'>
                    <h1 className='title m-0 mb-1'>{props.title}</h1>
                    <h2 className='author m-0'>{props.author}</h2>
                </div>
            </div>
            <div className='row'>
                <textarea className='description p-0 m-3 col-11' name="" id="" readOnly rows={6}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel dolor eros. Aenean sed mi nisi. Aliquam eu nisl eget libero lobortis posuere. Praesent semper, urna tristique porttitor tincidunt, velit enim vehicula nulla, vitae gravida ipsum nulla ut risus. Nam et turpis iaculis, congue eros tincidunt, fermentum elit. </textarea>
            </div>
        </div>
    );
}

export default CarruselData;