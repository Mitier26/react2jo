import React from 'react';
import './TourCard.style.css';

const TourCard = ({ data }) => {
    return (
        <div
            style={{
                backgroundImage: 'url(' + data.firstimage + ')',
            }}
            className="tour-card"
        >
            <div className="overlay">
                <h1>{data.title}</h1>
                <div>
                    <div>{data.addr1}</div>
                    <div>{data.addr2}</div>
                </div>
            </div>
        </div>
    );
};

export default TourCard;
