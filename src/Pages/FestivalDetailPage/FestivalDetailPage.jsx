import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import '../FestivalDetailPage/FestivalDetail_Page.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import app from '../../firebase';
import { clearUser } from '../../reducers/userSlice';


//좌표이용
const FestivalDetailPage = ({ mapX, mapY }) => {
    const x = mapX;
    const y = mapY;

    const [festivals, setFestivals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const appAuth = getAuth(app); // firebase auth 인증서
    const apiKey = process.env.REACT_APP_TOUR_API_KEY;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(appAuth, (user) => {
            if (user) {
                //userSlice Update 현재 유저로 상태 업데이트
                setIsLogged(true);
            } else {
                dispatch(clearUser());
                setIsLogged(false);
                navigate('/auth/login');
            }
        });
        return () => {
            unsubscribe(); // 인증해제
        };
    }, [appAuth]);

    const handleFestivalDetail = (festival) => {

        console.log(festival);
        if (festival !== undefined) {
            navigate(`/festival/${festival.contentid}`);
        } else {
            navigate(`/festival`);
            alert('죄송해요 해당축제는 정보가 존재하지 않습니다.')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const numOfRows = 30;
                const pageNo = 1;
                const mobileOS = "WIN";
                const mobileApp = "Festival";
                const listYN = "Y";
                const arrange = "A";
                const mapX = x;
                const mapY = y;
                const radius = "100000";
                const contentTypeId = "15";
                const modifiedtime = "20240418";
                const url = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${mobileOS}&MobileApp=${mobileApp}&_type=json&listYN=${listYN}&arrange=${arrange}&mapX=${mapX}&mapY=${mapY}&radius=${radius}&contentTypeId=${contentTypeId}&modifiedtime=${modifiedtime}&serviceKey=${apiKey}`;

                const response = await axios.get(url);
                const { data } = response;
                const { response: { body: { items: { item } } } } = data;

                setFestivals(item);

                setLoading(false);
            } catch (error) {
                setError("Failed to fetch festivals");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // 배열을 3개씩 나누기
    const chunkArray = (arr, chunkSize) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

    const chunkedFestivals = chunkArray(festivals, 3);

    return (
        <Container className='festivalDetailContainer'>
            <div className='festivalDetailTitle'>
                <h4>근처 축제 정보</h4>
            </div>
            <Carousel>
                {chunkedFestivals.length > 0 ? (
                    chunkedFestivals.map((chunk, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {chunk.map((festival, festivalIndex) => (
                                    <Col key={festivalIndex} lg={4} md={6} className="mb-4">
                                        <Card
                                            className='festivalDetailCardContainer'
                                            onClick={() => handleFestivalDetail(festival)}
                                        >
                                            {festival && festival.firstimage && (
                                                <Card.Img
                                                    className='festivalImage'
                                                    variant="top"
                                                    src={festival.firstimage}
                                                    alt="Festival Image"
                                                />
                                            )}
                                            <Card.Body className="festivalDetailCardBody" style={{ height: '130px' }}>
                                                <Card.Title>{festival.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{festival.startDate}</Card.Subtitle>
                                                <Card.Text>{festival.addr1}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))
                ) : (
                    <h4 className='festivalNoInfo'>10KM 내에 축제 정보가 존재하지 않네요ㅜ</h4>
                )}
            </Carousel>
        </Container>
    );
}

export default FestivalDetailPage;
