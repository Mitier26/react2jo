import React from 'react';
import KakaoMapLoader from '../../components/KaKaoMap/KakaoMapLoader';
import MainBanner from './MainBanner/MainBanner';
import TourSlider from '../../components/TourSlider/TourSlider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Map } from 'react-kakao-maps-sdk';
import MainAnimal from './MainAnimal/MainAnimal';
import { useCampingAnimal } from '../../hooks/useCampingAnimal';
import { Alert } from 'react-bootstrap';
import MainPublic from './MainPublic/MainPublic';
import isLoadingSpinner from '../../common/Spinner/isLoadingSpinner';

const MainPage = () => {
    const { data: cardData, isLoading, isError, error } = useCampingAnimal();
    if (isLoading) {
        return <div>{isLoadingSpinner}</div>;
    }
    if (isError) {
        return <Alert>{error.message}</Alert>;
    }
    return (
        <div>
            <MainBanner />
            <MainAnimal cardData={cardData} />
            <KakaoMapLoader />
            <MainPublic cardData={cardData} />
            <TourSlider />
        </div>
    );
};

export default MainPage;
