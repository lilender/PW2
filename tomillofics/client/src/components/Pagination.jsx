import React from "react";
import { Pagination } from "react-bootstrap";

function Pags({totalPages, currentPage, setCurrentPage}){
    const handlePageChange = (page) => {
        if(page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };
    if (totalPages === 0) {
        return (
            <div className="row mt-3">
            </div>
        )
    }
    return(
        <div className="row mt-3">
            <Pagination className="d-flex justify-content-center pagination">
                <Pagination.First onClick={ ()=> handlePageChange(1)} />
                <Pagination.Prev onClick={ ()=> handlePageChange(currentPage-1)} />
                {currentPage !== 1 && <Pagination.Item onClick={ ()=> handlePageChange(1)} >{1}</Pagination.Item>}
                {currentPage > 3 && <Pagination.Ellipsis />}
                {currentPage > 2 && <Pagination.Item onClick={ ()=> handlePageChange(currentPage-1)} >{currentPage - 1}</Pagination.Item>}
                <Pagination.Item active>{currentPage}</Pagination.Item>
                {currentPage < totalPages - 1 && <Pagination.Item onClick={ ()=> handlePageChange(currentPage+1)} >{currentPage + 1}</Pagination.Item>}
                {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
                {currentPage !== totalPages && <Pagination.Item onClick={ ()=> handlePageChange(totalPages)} >{totalPages}</Pagination.Item>}
                <Pagination.Next onClick={ ()=> handlePageChange(currentPage+1)}/>
                <Pagination.Last onClick={ ()=> handlePageChange(totalPages)} />
            </Pagination>
        </div>
        
    );
}

export default Pags;