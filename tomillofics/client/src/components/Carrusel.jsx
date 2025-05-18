import { Carousel } from "react-bootstrap";
import CarruselIMG from "./CarruselIMG";
import CarruselData from "./CarruselData"; 
import { useState, useEffect } from 'react';
import axios from 'axios';

function Carrusel({fics}) {
    const [ficInfo, setFicInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all(fics.map(fic =>
            axios.get(`/api/ficTopInfo?idfic=${fic.idfic}`)
        ))
        .then(responses => {
            const successfulResponses = responses
                .filter(r => r.data.message === "Success")
                .map(r => r.data);
            
            setFicInfo(successfulResponses);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            setLoading(false);
        });
    }, [fics]);

    if (loading) {
        return <div className="text-center p-5">Cargando carrusel...</div>;
    }

    if (!ficInfo.length) {
        return <></>;
    }

    return (
        <Carousel data-bs-theme="dark">
            {ficInfo.map((fic, index) => (
                <Carousel.Item key={fic.idfic || index}>
                    <div className="MainCarrousel row justify-content-center align-items-center px-5 pb-4">
                        <p className='col-3 num p-0 m-0 ps-5'>#{index + 1}</p>
                        <CarruselIMG 
                            src={`/api/public${fic.img_route}`}
                        />
                        <CarruselData 
                            title={fic.title} 
                            author={fic.username} 
                            description={fic.description}
                            src={`data:image/jpg;base64,${fic.profile_image}`}
                        />
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Carrusel;