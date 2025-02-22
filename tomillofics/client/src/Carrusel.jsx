import React from "react";
import { Carousel } from "react-bootstrap";

function Carrusel() {
    return (
        <Carousel>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://media.gettyimages.com/id/1164046558/es/foto/beb%C3%A9-oveja-de-cerca.jpg?s=612x612&w=gi&k=20&c=0YNIqdrmclc2Of1MMWLxhthDIwvoWzhN68_t3AY3qkU="
            alt="First slide"
            />
            <Carousel.Caption>
            <h3>First Slide</h3>
            <p>Some description here</p>
            </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://media.gettyimages.com/id/1164046558/es/foto/beb%C3%A9-oveja-de-cerca.jpg?s=612x612&w=gi&k=20&c=0YNIqdrmclc2Of1MMWLxhthDIwvoWzhN68_t3AY3qkU="
            alt="Second slide"
            />
            <Carousel.Caption>
            <h3>Second Slide</h3>
            <p>Another description</p>
            </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://media.gettyimages.com/id/1164046558/es/foto/beb%C3%A9-oveja-de-cerca.jpg?s=612x612&w=gi&k=20&c=0YNIqdrmclc2Of1MMWLxhthDIwvoWzhN68_t3AY3qkU="
            alt="Third slide"
            />
            <Carousel.Caption>
            <h3>Third Slide</h3>
            <p>More details here</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    );
}

export default Carrusel;
