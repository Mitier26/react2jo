import React from 'react';
import KakaoMapLoader from './components/KakaoMapLoader';
import { useCampingQuery } from '../../hooks/useCamping';
import { useFestivalQuery } from '../../hooks/useFestival';
import MainBanner from './MainBanner/MainBanner';
import MainAnimal from './MainAnimal/MainAnimal';

const MainPage = () => {
    // const { data, isLoading, isError, error } = useCampingQuery(37.5665, 126.978);
    const { data, isLoading, isError, error } = useFestivalQuery('20240418');

    if (isLoading) {
        return <h1>Loading....</h1>;
    }

    if (isError) {
        <h2>{error.message}</h2>;
    }

    console.log(data);

    return (
        <div>
            {/* <KakaoMapLoader /> */}
            <MainBanner />
            <MainAnimal />
        </div>
    );
};

export default MainPage;
