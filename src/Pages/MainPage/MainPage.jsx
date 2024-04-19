import React from 'react';
import KakaoMapLoader from '../../components/KaKaoMap/KakaoMapLoader';
import MainBanner from './MainBanner/MainBanner';
import TourSlider from '../../components/TourSlider/TourSlider';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Map } from 'react-kakao-maps-sdk';
import MainAnimal from './MainAnimal/MainAnimal';

const MainPage = () => {
    return (
        <div>
            <MainBanner />
            <KakaoMapLoader />
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
            <MainAnimal />
        </div>
    );
};

export default MainPage;
