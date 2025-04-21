import { Carousel } from "react-bootstrap";
import CoverLink from "./CoverLink";

function CarruselCovers({ fics = [], theme = "dark" }) {
    if (!fics || !Array.isArray(fics) || fics.length === 0) {
        return (
            <div className="text-center p-4">
                No hay fics disponibles.
            </div>
        );
    }

    const groupFicsIntoSlides = (fics, itemsPerSlide = 5) => {
        const slides = [];
        for (let i = 0; i < fics.length; i += itemsPerSlide) {
            slides.push(fics.slice(i, i + itemsPerSlide));
        }
        return slides;
    };

    const slidesArray = groupFicsIntoSlides(fics);

    return (
        <Carousel data-bs-theme={theme} indicators={false}>
            {slidesArray.map((slide, slideIndex) => (
                <Carousel.Item key={`slide-${slideIndex}`}>
                    <div className="row justify-content-center align-items-center px-5">
                        {slide.map((fic, itemIndex) => (
                            <CoverLink 
                                key={`fic-${fic.idfic || `${slideIndex}-${itemIndex}`}`} 
                                idfic={fic.idfic}
                            />
                        ))}
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarruselCovers;