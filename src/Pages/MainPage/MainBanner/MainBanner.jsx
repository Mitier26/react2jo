import React from 'react';
import './MainBanner.style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useCampingBasedList } from '../../../hooks/useCampingBasedList';
import { Alert, Container, Spinner } from 'react-bootstrap';

const MainBanner = () => {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        arrows: false,
    };
    const { data, isLoading, isError, error } = useCampingBasedList();
    // console.log(data);
    if (isLoading) {
        return <Spinner animation="border" variant="warning" />;
    }
    if (isError) {
        return <Alert>{error.message}</Alert>;
    }
    const CarouselItems = data.response.body.items.item;
    // console.log(CarouselItems);
    return (
        <div className="slider-container slider-area">
            <Slider {...settings} className="slider-item-box">
                {CarouselItems.map((item, index) => {
                    let stateLabel = '';
                    let stateSubLabel = '';
                    let bgId = '';
                    if (item.doNm === '충청남도' || item.doNm === '충청북도') {
                        stateLabel = '캠핑 말고 뭣이 중헌디?';
                        stateSubLabel = '가자!';
                        bgId = 'chung-chung';
                    } else if (item.doNm === '강원도') {
                        stateLabel = '이번 캠핑은 어디?';
                        stateSubLabel = '여기!';
                        bgId = 'gang-won';
                    } else if (item.doNm === '경상남도' || item.doNm === '경상북도') {
                        stateLabel = '캠핑장 살↗아있네!';
                        stateSubLabel = '신난다!';
                        bgId = 'kyung-sang';
                    } else if (item.doNm === '전라남도' || item.doNm === '전라북도') {
                        stateLabel = '캠핑장 가가지고 바베큐 한 번 구울라니까~';
                        stateSubLabel = '오세요~';
                        bgId = 'jun-ra';
                    } else if (item.doNm === '경기도') {
                        stateLabel = '숨은 캠핑 맛집!';
                        stateSubLabel = '어서오세요~';
                        bgId = 'kyung-ki';
                    }
                    return (
                        <div className={`slider-item `} key={item.contentId}>
                            <div className={`slider-color ${bgId}`}></div>
                            <Container className="d-flex container-height">
                                <div className="slider-text">
                                    <div className="slider-text-items">
                                        <h2>{stateLabel}</h2>
                                        <h2>
                                            {stateSubLabel} {item.doNm}
                                        </h2>
                                        <h4>{item.facltNm}</h4>
                                    </div>
                                </div>
                                <div className="slider-img-box">
                                    <img src={item.firstImageUrl} className="slider-img" />
                                    <div className='prac'></div>
                                </div>
                            </Container>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default MainBanner;
