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
    const [ficStatus, setFicStatus] = useState(-1); // -1: All, 1: Completed, 0: In Progress
    const [totalPages, setTotalPages] = useState(0);
    const [totalFics, setTotalFics] = useState(0);
    const [idtags, setIdTags] = useState('');

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
        axios.get(`/api/nSearchFics?text=${searchText}&idtags=${idtags}&status=${ficStatus}`)
        .then(resp => {
            if (resp.data.message === "Success") {
                setTotalFics(resp.data.nfics);
                setCurrentPage(1);
                setTotalPages(Math.ceil(resp.data.nfics / nFics));
            } else {
                Swal.fire({
                    color: '#4C0B0B',
                    background: '#EACDBD',
                    iconColor: '#4C0B0B',
                    customClass: {
                        confirmButton: "btn-main",
                        cancelButton: "btn-sec",
                        title: 'title',
                    },
                    icon: 'error',
                    text: 'No se pudo obtener la información de los fics.'
                });
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            Swal.fire({
                color: '#4C0B0B',
                background: '#EACDBD',
                iconColor: '#4C0B0B',
                customClass: {
                    confirmButton: "btn-main",
                    cancelButton: "btn-sec",
                    title: 'title',
                },
                icon: 'error',
                text: 'Hubo un problema al conectar con el servidor.'
            });
        });
    }
    , [searchText, ficStatus, idtags]);

    useEffect(() => {
        axios.get(`/api/filteredFics?text=${searchText}&nfics=${nFics}&npage=${offset}&idtags=${idtags}&status=${ficStatus}`)
        .then(resp => {
            if (resp.data.message === "Success") {
                setSearchFics(resp.data.fics);
            } else {
                Swal.fire({
                    color: '#4C0B0B',
                    background: '#EACDBD',
                    iconColor: '#4C0B0B',
                    customClass: {
                        confirmButton: "btn-main",
                        cancelButton: "btn-sec",
                        title: 'title',
                    },
                    icon: 'error',
                    text: 'No se pudo obtener la información de los fics.'
                });
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            Swal.fire({
                color: '#4C0B0B',
                background: '#EACDBD',
                iconColor: '#4C0B0B',
                customClass: {
                    confirmButton: "btn-main",
                    cancelButton: "btn-sec",
                    title: 'title',
                },
                icon: 'error',
                text: 'Hubo un problema al conectar con el servidor.'
            });
        });
    }, [searchText, nFics, offset, ficStatus, idtags]);

    
    return(
        <div className='back-color'>
            <NavBar></NavBar>
            <div className='data-container'>
                <div className='row justify-content-center'>
                    <Filters setIdTags={setIdTags} totalFics={totalFics} searchText={searchText} setFicStatus={setFicStatus} ficStatus={ficStatus}></Filters>
                    <SearchResults totalPages={totalPages} searchFics={searchFics} currentPage={currentPage} setCurrentPage={setCurrentPage}></SearchResults>
                </div>
            </div>
        </div>
    );
}

export default Search;