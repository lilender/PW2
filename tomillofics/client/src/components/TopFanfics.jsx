import 'bootstrap/dist/css/bootstrap.css';

function TopFanfics(fanfic){
    return (
        <div className='col-9 tops justify-content-center p-0'>
            <div className='row'>
                <div className='col-3 img-container m-0 p-0'>
                    <img className='m-0' src="/img/Mirrors.png" alt="" />
                </div>
                <div className='col-9 m-0 p-0 align-self-end'>
                    <div className='text-container p-3 row'>
                        <h2 className='title m-0'>{fanfic.title}</h2>
                        <h3 className='author m-0'>{fanfic.author}</h3>
                        <p className='description m-0'>{fanfic.description}</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default TopFanfics;