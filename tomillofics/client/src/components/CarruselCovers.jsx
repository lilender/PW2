import React from "react";
import { Carousel } from "react-bootstrap";
import CoverLink from "./CoverLink";

function CarruselCovers(props) {
    return (
        <Carousel data-bs-theme={props.theme} indicators={false}>
            <Carousel.Item>
                <div className="row justify-content-center align-items-center px-5">
                    <CoverLink key={1} idfic={4}></CoverLink>
                    <CoverLink key={2} idfic={4}></CoverLink>
                    <CoverLink key={3} idfic={4}></CoverLink>
                    <CoverLink key={4} idfic={4}></CoverLink>
                    <CoverLink key={5} idfic={4}></CoverLink>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <div className="row justify-content-center align-items-center px-5">
                    <CoverLink key={1} idfic={4}></CoverLink>
                    <CoverLink key={2} idfic={4}></CoverLink>
                    <CoverLink key={3} idfic={4}></CoverLink>
                    <CoverLink key={4} idfic={4}></CoverLink>
                    <CoverLink key={5} idfic={4}></CoverLink>
                </div>
            </Carousel.Item>

            <Carousel.Item>
                <div className="row justify-content-center align-items-center px-5">
                    <CoverLink key={1} idfic={4}></CoverLink>
                    <CoverLink key={2} idfic={4}></CoverLink>
                    <CoverLink key={3} idfic={4}></CoverLink>
                    <CoverLink key={4} idfic={4}></CoverLink>
                    <CoverLink key={5} idfic={4}></CoverLink>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarruselCovers;