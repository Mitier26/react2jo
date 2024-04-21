import React, { createElement } from 'react'
import { useParams } from 'react-router-dom'
import { useFestivalIntro } from '../../hooks/useFestivalIntro';
import { useFestivalInfo } from '../../hooks/useFestivalInfo';
import { useFestivalFoto } from '../../hooks/useFestivalFoto';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import './FestivalInfoPage.style.css';
import FestivalDetailPage from '../FestivalDetailPage/FestivalDetailPage';
import isLoadingSpinner from '../../common/Spinner/isLoadingSpinner';
import { useFestivalDetail } from '../../hooks/useFestivalDetail';



const FestivalInfoPage = () => {
    const {id} = useParams();
    console.log(id);
    const { data:intro, isLoading, isError, error } = useFestivalDetail(id);
    const IntroItem = intro?.body.items.item;
    console.log(intro)
    const { data:info, isLoading:infoLoading, isError:infoError, error:infosError } = useFestivalInfo(id);
    const InfoItem = info?.body.items.item;
    console.log(InfoItem)
    const { data:foto, isLoading:fotoLoading, isError:fotoError, error:fotosError } = useFestivalFoto(id);
    const fotoItem = foto?.body.items.item;
    console.log(fotoItem)

    if (isLoading||infoLoading||fotoLoading) {
      return (
          <div>
              {isLoadingSpinner()}
          </div>
      );
  }
  if (isError||infoError||fotoError) {
      return <Alert>{error.message}</Alert>;
  }

  return (
    <Container className='festival-info'>
      <Row>
        <Col lg={7} className='festival-info-end'>
          <div className='festival-info-img-box'>
            <img src={fotoItem?fotoItem[0].firstimage:''}
              className='festival-info-img' />
          </div>
        </Col>
        <Col lg={5}>
          <div className='festival-info-text-area'>
            <div className='festival-info-title'>{fotoItem?fotoItem[0].title:''}</div>
            <div><button>장소</button>{IntroItem?IntroItem[0].eventplace:''}</div>
            <div><button>행사 시작일</button>{IntroItem?IntroItem[0].eventenddate:''}</div>
            <div><button>행사 종료일</button>{IntroItem?IntroItem[0].eventstartdate:''}</div>
            <div><button>행사 시간</button>{IntroItem?IntroItem[0].playtime:''}</div>
            <div><button>주최자</button>{IntroItem?IntroItem[0].sponsor1:''}</div>
            <div><button>주관사</button>{IntroItem?IntroItem[0].sponsor2:''}</div>
            <div><button>주최자 연락처</button>{IntroItem?IntroItem[0].sponsor1tel:''}</div>
            <div><button>주최자</button><span dangerouslySetInnerHTML={{ __html: fotoItem[0].homepage}}/></div>
            <div><button>홈페이지</button>{IntroItem?IntroItem.sponsor2:''}</div>
          </div>
        </Col>
      </Row>
      <Row className='festival-info-center'>
        <Col lg={10} className='festival-info-border'>
          <div>
            <button>행사소개</button>
            <p>{InfoItem?InfoItem[0].infotext:''}</p>
          </div>
          <div>
            <button>행사내용</button>
            {InfoItem && InfoItem.length >= 2 ? <p dangerouslySetInnerHTML={{ __html: InfoItem[1].infotext }} /> : ''}
          </div>
        </Col>
      </Row>
      {fotoItem?(fotoItem[0].mapx && fotoItem[0].mapy && <FestivalDetailPage key={fotoItem[0].contentid} mapX={fotoItem[0].mapx} mapY={fotoItem[0].mapy} />):''}
    </Container>
  )
}

export default FestivalInfoPage
