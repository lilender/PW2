import FanficFront from './FanficFront';
import Pags from './Pagination';

function SearchResults({searchFics}){
    return(
        <div className='col-8'>
            {
            Array.isArray(searchFics) && searchFics.length > 0 ?
            searchFics.map((fic) => (
                    <FanficFront key={fic.idfic} idfic={fic.idfic} type='1'></FanficFront>
                ))
                :
                <div className='col-12 text-center'>
                    <p>No hay fics disponibles.</p>
                </div>
            }
            <Pags></Pags>
        </div>
    );
}

export default SearchResults;