import React from "react";
import { Pagination } from "react-bootstrap";

function Pags(){
    return(
        <div className="row mt-3">
            <Pagination className="d-flex justify-content-center pagination">
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div>
        
    );
}

export default Pags;