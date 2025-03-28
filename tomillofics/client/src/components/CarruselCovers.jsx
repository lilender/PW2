import React from "react";
import { Carousel } from "react-bootstrap";
import CoverLink from "./CoverLink";

function CarruselCovers(props) {
    return (
        <Carousel data-bs-theme={props.theme} indicators={false}>
            <Carousel.Item>
                <div className="row justify-content-center align-items-center px-5">
                    <CoverLink src={'/img/Mirrors (5).png'} content="Fantasía"></CoverLink>
                    <CoverLink src={'/img/Mirrors (6).png'} content="Romance"></CoverLink>
                    <CoverLink src={'/img/Mirrors (7).png'} content="Aventura"></CoverLink>
                    <CoverLink src={'/img/Mirrors (8).png'} content="Comming of age"></CoverLink>
                    <CoverLink src={'/img/Mirrors (9).png'} content="Romance"></CoverLink>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <div className="row justify-content-center align-items-center px-5">
                    <CoverLink src={'/img/Mirrors (10).png'} content="Fantasía"></CoverLink>
                    <CoverLink src={'/img/Mirrors (11).png'} content="Romance"></CoverLink>
                    <CoverLink src={'/img/Mirrors (12).png'} content="Aventura"></CoverLink>
                    <CoverLink src={'/img/Mirrors (13).png'} content="Comming of age"></CoverLink>
                    <CoverLink src={'/img/Mirrors (14).png'} content="Romance"></CoverLink>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <div className="row justify-content-center align-items-center px-5">
                    <CoverLink src={'/img/Mirrors (15).png'} content="Fantasía"></CoverLink>
                    <CoverLink src={'/img/Mirrors (16).png'} content="Romance"></CoverLink>
                    <CoverLink src={'/img/Mirrors (17).png'} content="Aventura"></CoverLink>
                    <CoverLink src={'/img/Mirrors (18).png'} content="Comming of age"></CoverLink>
                    <CoverLink src={'/img/Mirrors (19).png'} content="Romance"></CoverLink>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarruselCovers;