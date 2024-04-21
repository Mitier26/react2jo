import React from 'react'
import { useParams } from 'react-router-dom'
import { useFestivalIntro } from '../../hooks/useFestivalIntro';
import { useFestivalInfo } from '../../hooks/useFestivalInfo';
import { useFestivalFoto } from '../../hooks/useFestivalFoto';
import { Col, Container, Row } from 'react-bootstrap';




const FestivalInfoPage = () => {
    const {id} = useParams();
    const { data:intro, isLoading, isError, error } = useFestivalIntro(id);
    const IntroItem = intro?.body.items.item[0];
    console.log(IntroItem)
    const { data:info } = useFestivalInfo(id);
    const InfoItem = info?.body.items.item;
    console.log(InfoItem)
    const { data:foto } = useFestivalFoto(id);
    const fotoItem = foto?.body.items.item[0]
    console.log(fotoItem)
    console.log(fotoItem?.firstimage)

  return (
    <Container>
      <Row>
        <Col>
          <div className='festival-info-img'>
            <img src={fotoItem?.firstimage}></img>
          </div>
        </Col>
        <Col>
          <div>
            <div>{fotoItem?.title}</div>
            <div><button>장소</button>{IntroItem?IntroItem.eventplace:''}</div>
            <div><button>행사 시작일</button>{IntroItem?IntroItem.eventenddate:''}</div>
            <div><button>행사 종료일</button>{IntroItem?IntroItem.eventstartdate:''}</div>
            <div><button>행사 시간</button>{IntroItem?IntroItem.playtime:''}</div>
            <div><button>주최자</button>{IntroItem?IntroItem.sponsor2:''}</div>
            <div><button>주최자 연락처</button>{IntroItem?IntroItem.sponsor1tel:''}</div>
            <div><button>홈페이지</button>{IntroItem?IntroItem.sponsor2:''}</div>
            <div><button>주최자</button>{fotoItem?fotoItem.homepage:''}</div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default FestivalInfoPage
