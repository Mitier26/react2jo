import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { Badge } from 'react-bootstrap'
import './SearchedCampingCard.css'
import { useNavigate } from 'react-router-dom'
import noImage from '../../../assets/noImage.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'

const SearchedCampingCard = ({ data, contentId, address }) => {
   const navigate = useNavigate()
   const handle = () => {
      navigate(`/camping/${contentId}?keyword=${address}`)
   }

   return (
      <Card className="justify-content-center camping-search-card mb-4">
         <Card.Img
            className="camping-card-img"
            variant="top"
            src={data?.firstImageUrl ? data.firstImageUrl : noImage}
            onClick={handle}
            alt={`${data?.facltNm}`}
         />
         <Card.Body>
            <Card.Title className="camping-card-title">
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
               <FontAwesomeIcon icon={faLocationDot} />
               &nbsp;
               {data?.addr1}
               {data?.addr2}
            </ListGroup.Item>
            <ListGroup.Item>
               <Badge bg="warning">{data?.resveCl}</Badge>&nbsp;&nbsp;&nbsp;
               <p>
                  <FontAwesomeIcon icon={faLink} /> &nbsp;
                  <a href={`${data?.homepage}`}>{data?.homepage}</a>
               </p>
               <p>
                  <FontAwesomeIcon icon={faPhone} /> &nbsp;
                  {data?.tel}
               </p>
            </ListGroup.Item>
            <ListGroup.Item>
               {data?.sbrsCl.split(',').map((facility, index) => (
                  <Badge key={index} className=" justify-content-around me-1 info-badge">
                     {facility}
                  </Badge>
               ))}
            </ListGroup.Item>
         </ListGroup>
      </Card>
   )
}

export default SearchedCampingCard
