import React from 'react'
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountainSun, faTree, faUmbrellaBeach, faWater } from '@fortawesome/free-solid-svg-icons';
import './MainAnimal.style.css'
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';

const MainAnimal = (data) => {
    const navigate = useNavigate();
    const getCardDetail = (item) => {
      navigate(`/camping/${item.contentId}?keyword=${item.facltNm}`);
    }
    const animalList = data?.cardData.response.body.items.item;
    let animalItems = [];
    if (animalList) {
        animalList.map((item)=>{
            if (animalItems.length<5 && item.animalCmgCl != '불가능') {
                animalItems.push(item);
            }
        })      
    }

  return (
    <Container className='mb-5'>
      <div className='card-area-title'>
        <div className='animal-container-title'>반려동물 동반 캠핑장 </div>
        {/* <div className='animal-container-subtitle'>우리 같이 캠핑 가자go!</div> */}
      </div>
      <div className='animal-scroll'>
        <div className='animal-card'>
          {animalItems?.map(item=>{
            let locationIcon = '';
            if (item.lctCl==='숲') {
              locationIcon = <FontAwesomeIcon icon={faTree} />
            } else if (item.lctCl==='해변') {
              locationIcon = <FontAwesomeIcon icon={faUmbrellaBeach} />
            } else if (item.lctCl==='산') {
              locationIcon = <FontAwesomeIcon icon={faMountainSun} />
            } else if (item.lctCl==='강'|| item.lctCl==='계곡') {
              locationIcon = <FontAwesomeIcon icon={faWater} />
            }
            return(
              <div
                key={item.contentId} 
                className='animal-card-margin'
                onClick={()=>getCardDetail(item)}
              >
                <div
                  style={{backgroundImage:"url("+`${item.firstImageUrl}`+")"}}
                  className='animal-card-item'
                >
                  <div className='animal-badge'>반려동물</div>
                  <h2 className='animal-name'>{item.facltNm}</h2>
                  <div className='foo-area'>
                    <div className='animal-do'>{item.doNm}</div>
                    <div className='location-badge'>{locationIcon}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>  
      </div>
      
    </Container>
  )
}

export default MainAnimal
