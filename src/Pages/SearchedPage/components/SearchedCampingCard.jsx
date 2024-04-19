import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Badge } from 'react-bootstrap';
import './SearchedCampingCard.css';
import { useNavigate } from 'react-router-dom';

const SearchedCampingCard = ({ data }) => {
    const navigate = useNavigate();
    return (
        <Card style={{ width: '35rem' }} onClick={() => navigate(`&${data?.contentId}`)}>
            <Card.Img variant="top" src={`${data?.firstImageUrl}`} style={{ height: '20rem' }} />
            <Card.Body style={{ height: '15rem' }}>
                <Card.Title>
                    [{data?.doNm}&nbsp;
                    {data?.sigunguNm}]&nbsp;{data?.facltNm}
                </Card.Title>
                <Card.Text className="camping-card-text">
                    <p>{data?.lineIntro}</p>
                    <p>{data?.intro}</p>
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                    {data?.addr1}
                    {data?.addr2}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Badge>{data?.resveCl}</Badge>&nbsp;&nbsp;&nbsp;
                    <a href={`${data?.homepage}`}>{data?.homepage}</a>&nbsp;&nbsp;
                    <span>{data?.tel}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    {data?.sbrsCl.split(',').map((facility, index) => (
                        <Badge key={index} bg="success" className=" justify-content-around py-2 me-1">
                            {facility}
                        </Badge>
                    ))}
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default SearchedCampingCard;
