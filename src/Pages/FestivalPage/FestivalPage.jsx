//FestivlaPage.jsx


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Pagination, Alert} from "react-bootstrap";
import './FestivalPage.style.css';
import noImage from "../../assets/noImage.png";
import isLoadingSpinner from "../../common/Spinner/isLoadingSpinner"; 
import { useNavigate } from "react-router-dom";

const FestivalPage = () => {
  const [festivals, setFestivals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const festivalsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "KQM2A5C9L5RvGwpDcXQv5wtEijp0j9vQIrFFSO2El1eZeSD3rnezIEKaWrg9hTRwrx4Zeg4V1Tguhm%2BmpTCTXA%3D%3D";
        const url = `https://apis.data.go.kr/B551011/KorService1/searchFestival1?numOfRows=100&pageNo=1&MobileOS=WIN&MobileApp=Festival&_type=json&listYN=Y&arrange=D&eventStartDate=20100101&eventEndDate=20240420&serviceKey=${apiKey}`;

        const response = await axios.get(url);
        const { data } = response;
        const { response: { body: { items: { item } } } } = data;

        if (Array.isArray(item) && item.length > 0) {
          setFestivals(item);
        } else {
          setError("No festivals found");
        }

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch festivals");
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const indexOfLastFestival = currentPage * festivalsPerPage;
  const indexOfFirstFestival = indexOfLastFestival - festivalsPerPage;
  const currentFestivals = festivals.slice(indexOfFirstFestival, indexOfLastFestival);

  if (isLoading) {
    return isLoadingSpinner();
  }

  if (isError) {
    return <Alert variant="danger">{isError}</Alert>;
  }

  return (
    <Container>
      <h1 className="my-4">전국 축제 리스트</h1>
      <Row>
        {currentFestivals.map((festival, index) => (
          <Col key={index} lg={3} md={6} className="mb-4" onClick={()=>navigate(`/festival/${festival.contentid}`)}>
            <Card className="h-100 festival-cursor">
              <Card.Img
                className='festivalImage'
                variant="top"
                src={festival.firstimage ? festival.firstimage : noImage}
                alt="Festival Image"
              />
              <Card.Body>
                <Card.Title>{festival.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{festival.startDate}</Card.Subtitle>
                <Card.Text>{festival.addr1}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination>
        {[...Array(Math.ceil(festivals.length / festivalsPerPage)).keys()].map((number) => (
          <Pagination.Item key={number} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default FestivalPage;