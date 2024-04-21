import React from 'react';
import { useFestivalQuery } from '../../hooks/useFestival';
import { Alert, Container, Spinner } from 'react-bootstrap';
import MasterSlider from '../MasterSlider/MasterSlider';
import { responsive } from '../responsive';

const TourSlider = () => {
    const getToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 해주고, 2자리로 만듭니다.
        const day = String(today.getDate()).padStart(2, '0'); // 일도 2자리로 만듭니다.

        return `${year}${month}${day}`;
    };
    const { data, isLoading, isError, error } = useFestivalQuery(getToday());

    console.log(data);
    if (isLoading) {
        return <Spinner animation="border" variant="warning" />;
    }
    if (isError) {
        return <Alert>{error.message}</Alert>;
    }

    return (
        <Container>
            <MasterSlider title="축제" data={data} responsive={responsive} />
        </Container>
    );
};

export default TourSlider;
