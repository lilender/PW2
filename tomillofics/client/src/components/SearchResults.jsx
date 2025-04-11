import FanficFront from './FanficFront';
import Pags from './Pagination';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

function SearchResults(){
    const [searchFics, setSearchFics] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/filteredFics?text=${""}&nfics=5&npage=0&idtags=${""}`)
        .then(resp => {
            if (resp.data.message === "Success") {
                setSearchFics(resp.data.fics);
            } else {
                Swal.fire('Error', 'No se pudo obtener la información de los fics.', 'error');
            }
        }
        );
    }, []);
    
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