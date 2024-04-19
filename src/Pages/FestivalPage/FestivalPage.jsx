import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

const FestivalPage = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "KQM2A5C9L5RvGwpDcXQv5wtEijp0j9vQIrFFSO2El1eZeSD3rnezIEKaWrg9hTRwrx4Zeg4V1Tguhm%2BmpTCTXA%3D%3D";
        const numOfRows = 30;
        const pageNo = 1;
        const mobileOS = "WIN";
        const mobileApp = "Festival";
        const listYN = "Y";
        const arrange = "A";
        const mapX = "126";
        const mapY = "37"; 
        const radius = "90000000"; 
        const contentTypeId = "15"; 
        const modifiedtime = "20240418";
        const url = `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=${mobileOS}&MobileApp=${mobileApp}&_type=json&listYN=${listYN}&arrange=${arrange}&mapX=${mapX}&mapY=${mapY}&radius=${radius}&contentTypeId=${contentTypeId}&modifiedtime=${modifiedtime}&serviceKey=${apiKey}`;

        const response = await axios.get(url);
        const { data } = response;
        const { response: { body: { items: { item } } } } = data;

        console.log("Festivals data:", item);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <h1 className="my-4">전국 축제 리스트</h1>
      <Row>
        {festivals.map((festival, index) => (
          <Col key={index} lg={4} md={6} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{festival.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{festival.startDate}</Card.Subtitle>
                <Card.Text>{festival.addr1}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FestivalPage;