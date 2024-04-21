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
      return (
        <div>
            {isLoadingSpinner}
        </div>
      )
    }
    if (isError) {
        return <Alert>{error.message}</Alert>;
    }
    return (
        <div>
            <MainBanner />
            <MainAnimal cardData={cardData} />
            <KakaoMapLoader />
            <MainPublic cardData={cardData}/>
            <TourSlider />
            {/* <Map // 지도를 표시할 Container
                id="map"
                center={{
                    // 지도의 중심좌표
                    lat: 33.450701,
                    lng: 126.570667,
                }}
                style={{
                    // 지도의 크기
                    width: '100%',
                    height: '350px',
                }}
                level={3} // 지도의 확대 레벨
            /> */}
        </div>
    );
};

export default MainPage;
