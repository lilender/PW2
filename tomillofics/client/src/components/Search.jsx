import NavBar from './NavBar';
import Filters from './Filters';
import SearchResults from './SearchResults';

function Search(){
    return(
        <div className='back-color'>
            <NavBar></NavBar>
            <div className='data-container'>
                <div className='row justify-content-center'>
                    <Filters></Filters>
                    <SearchResults></SearchResults>
                </div>
            </div>
        </div>
    );
}

export default Search;