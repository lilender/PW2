import Comment from './Comment';
import Pags from './Pagination';
import BTNMain from './BTNMain';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function CommentsSection({idfic, idchapter}){
    const iduser = localStorage.getItem('iduser');
    const username = localStorage.getItem('username');
    const [comments, setComments] = useState([]);
    const ncomments = 5; // Number of comments per page
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setOffset((currentPage - 1) * ncomments);
    }
    , [currentPage]);

    useEffect(() => {
        axios.get(`/api/nComments?idfic=${idfic}&idchapter=${idchapter}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setTotalPages(Math.ceil( parseInt(resp.data.ncomments) / ncomments));
                } else {
                    console.error('Error fetching number of comments:', resp.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching number of comments:', error);
            });
    },[idfic, idchapter]);

    useEffect(() => {
        axios.get(`/api/chapterComments?idfic=${idfic}&idchapter=${idchapter}&ncomments=${ncomments}&npage=${offset}`)
            .then(resp => {
                if (resp.data.message === "Success") {
                    setComments(resp.data.comments);
                } else {
                    console.error('Error fetching comments:', resp.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    },[idfic, idchapter, ncomments, offset]);

    const saveComment = () => {
        const commentText = document.getElementById('input-comment').value;
        if(commentText.length > 0){
            axios.post(`/api/createComment`, {
                idfic: idfic,
                idchapter: idchapter,
                text: commentText,
                iduser: iduser
            })
            .then(resp => {
                if (resp.data.message === "Success") {
                    console.log('Comment saved successfully');
                    setComments([...comments, {username: username, text: commentText}]);
                    document.getElementById('input-comment').value = '';
                } else {
                    console.error('Error saving comment:', resp.data.message);
                }
            })
            .catch(error => {
                console.error('Error saving comment:', error);
            });
        }
    }

    return(
        <div className='comments-section'>
            <div className='data-container d-flex justify-content-center align-items-center flex-column px-5'>
                <div className='row align-self-start p-4 px-5 pb-0 ms-3'>
                    <h1 className='title-light p-0'>Comentarios</h1>
                </div>
                {
                    comments?.map((comment, index) => {
                        return(
                            <Comment key={index} src={comment.profile_image && comment.profile_image !== "null" && comment.profile_image !== "undefined"
                                ? `data:image/jpg;base64,${comment.profile_image}`
                                : "/img/tomilloprofile.png"} userName={comment.username} commentText={comment.text}></Comment>
                        );
                    })
                }
                <Pags totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}></Pags>
                <textarea className='me-3 mt-4 p-3 comment-textarea' placeholder='Deja un comentario...' name="" id="input-comment"></textarea>
                <div className='d-flex flex-row-reverse m-4 me-5 pe-5 w-100'>
                    <BTNMain onClick={saveComment} type='3' content='Publicar comentario'></BTNMain>
                </div>
            </div>
        </div>
    );
}

export default CommentsSection;