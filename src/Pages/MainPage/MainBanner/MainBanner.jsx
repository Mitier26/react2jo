import React from 'react';
import './MainBanner.style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useCampingBasedList } from '../../../hooks/useCampingBasedList';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import isLoadingSpinner from '../../../common/Spinner/isLoadingSpinner';

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
    if (isLoading) {
        return (
            <div>
                {isLoadingSpinner()}
            </div>
        );
    }
    if (isError) {
        return <Alert>{error.message}</Alert>;
    }
    const CarouselItems = data.response.body.items.item;
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
                        stateSubLabel = '마!';
                        bgId = 'kyung-sang';
                    } else if (item.doNm === '전라남도' || item.doNm === '전라북도') {
                        stateLabel = '캠핑장 가가지고 바베큐 한 번 구울라니까~';
                        stateSubLabel = '가자!';
                        bgId = 'jun-ra';
                    } else if (item.doNm === '경기도') {
                        stateLabel = '숨은 캠핑 맛집!';
                        stateSubLabel = '여기!';
                        bgId = 'kyung-ki';
                    }
                    return (
                        <div key={item.contentId}>
                            <div className={`slider-color ${bgId}`}></div>
                            <Container className="container-height">
                                <Row>
                                    <Col sm={6} className="slider-text">
                                        <div className="slider-text-items">
                                            <h2 className='label-style'>{stateLabel}</h2>
                                            <h2>
                                                <span className='sub-style'>{stateSubLabel}</span><span className='do-style'>{item.doNm}</span>
                                            </h2>
                                            <h4>{item.facltNm}</h4>
                                        </div>
                                    </Col>
                                    <Col sm={5} className='slider-img-area'>
                                        <div className="slider-img-box">
                                            <img src={item.firstImageUrl} className="slider-img" />
                                            <div className='prac'></div>
                                        </div>
                                    </Col>  
                                </Row>
                                
                            </Container>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default MainBanner;
