import React from 'react';
import './MasterSlider.style.css';
import TourCard from '../TourCard/TourCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { Carousel } from 'react-bootstrap';

const MasterSlider = ({ title, data, responsive }) => {
    return (
        <div className="mt-4">
            <h3>{title}</h3>
            <Carousel
                infinite={true}
                centerMode={false}
                itemClass="movie-slicer p-1"
                containerClass="carousel-container"
                responsive={responsive}
                // focusOnSelect={true}
            >
                {data.item.map((item, index) => (
                    <TourCard data={item} key={index} />
                ))}
            </Carousel>
        </div>
    );
};

export default MasterSlider;
