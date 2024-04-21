import React from 'react';
import './TourCard.style.css';
import { useNavigate } from 'react-router-dom';

const TourCard = ({ data }) => {
    const navigate = useNavigate();
    console.log(data)
    let doName = data.addr1.split(" ");
    return (
        <div
            style={{
                backgroundImage: 'url(' + data.firstimage + ')',
            }}
            className="tour-card"
            onClick={()=>navigate(`/festival/${data.contentid}`)}
        >
            <div className="festival-slide-card">
                <div className='festival-border'></div>
                <div className='festival-text-bg'>
                     <h2 className='festival-slide-card-text'>{data.title}</h2>
                    <div className='festival-do'>{doName[0]}</div>
                    {/* <div>{data.addr2}</div> */}
                </div>
            </div>
        </div>
    );
};

export default TourCard;
