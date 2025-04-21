import BrownLine from './BrownLine';
import CoverLink from './CoverLink';

function CoversRow({fics, header}){
    return(
        <div>
            <BrownLine></BrownLine>
            <h1 className='title m-0 mt-4 p-0'>{header}</h1>
            <div className='row justify-content-around mt-3 mx-0 px-5'>
                {
                Array.isArray(fics) && fics.length > 0 ?
                    fics.map((fic) => (
                        <CoverLink key={fic.idfic} idfic={fic.idfic} />
                    ))
                    :
                    <div className='col-12 text-center'>
                        <p>No hay fics disponibles.</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default CoversRow;