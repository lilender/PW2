import FanficFront from './FanficFront';

function SearchResults({searchFics, currentPage, setCurrentPage}){
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
            <div onClick={ ()=> setCurrentPage(currentPage+1)} className='col-12 text-center'>
                <p className='text-secondary'>Cargar más</p>
            </div>
        </div>
    );
}

export default SearchResults;