import React from "react";
import { Carousel } from "react-bootstrap";
import CarruselIMG from "./CarruselIMG";
import CarruselData from "./CarruselData"; 

function Carrusel() {
    return (
        <Carousel data-bs-theme="dark">
            <Carousel.Item>
                <div className="MainCarrousel row justify-content-center align-items-center px-5 pb-4">
                    <p className='col-3 num p-0 m-0 ps-5'>#1</p>
                    <CarruselIMG src='/img/Mirrors.png'></CarruselIMG>
                    <CarruselData src='/img/9.jpg' title="Mirrors" author="Lilender"></CarruselData>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <div className="MainCarrousel row justify-content-center align-items-center px-5 pb-4">
                    <p className='col-3 num p-0 m-0 ps-5'>#2</p>
                    <CarruselIMG src='/img/Mirrors (2).png'></CarruselIMG>
                    <CarruselData src='/img/5.jpg' title="La guerra del cielo" author="Lilender"></CarruselData>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <div className="MainCarrousel row justify-content-center align-items-center px-5 pb-4">
                    <p className='col-3 num p-0 m-0 ps-5'>#3</p>
                    <CarruselIMG src='/img/Mirrors (3).png'></CarruselIMG>
                    <CarruselData src='/img/2.jpg' title="Enamorándose del matón de la escuela" author="Lilender"></CarruselData>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default Carrusel;    
