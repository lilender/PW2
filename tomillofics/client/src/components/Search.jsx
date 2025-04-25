import NavBar from './NavBar';
import Filters from './Filters';
import SearchResults from './SearchResults';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Search(){
    const [searchFics, setSearchFics] = useState([]);
    const [searchText, setSearchText] = useState("");
    const location = useLocation();

    const nFics = 5; // Number of fics per page
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
            setOffset((currentPage - 1) * nFics);
        }
        , [currentPage]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const text = params.get('text');
        setSearchText(text);
    }
    , [location.search]);

    useEffect(() => {
        axios.get(`http://localhost:3001/filteredFics?text=${searchText}&nfics=${nFics}&npage=${offset}&idtags=${""}`)
        .then(resp => {
            if (resp.data.message === "Success") {
                setSearchFics(prevFics => {
                    const existingIds = new Set(prevFics.map(fic => fic.idfic));
                    const newFics = resp.data.fics.filter(fic => !existingIds.has(fic.idfic));
                    return [...prevFics, ...newFics];
                });
            } else {
                Swal.fire('Error', 'No se pudo obtener la información de los fics.', 'error');
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            Swal.fire('Error', 'Hubo un problema al conectar con el servidor.', 'error');
        });
    }, [searchText, nFics, offset]);

    
    return(
        <div className='back-color'>
            <NavBar></NavBar>
            <div className='data-container'>
                <div className='row justify-content-center'>
                    <Filters></Filters>
                    <SearchResults searchFics={searchFics} currentPage={currentPage} setCurrentPage={setCurrentPage}></SearchResults>
                </div>
            </div>
        </div>
    );
}

export default Search;