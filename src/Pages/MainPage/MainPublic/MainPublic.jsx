import React from 'react'
import { Container } from 'react-bootstrap';
import './MainPublic.style.css'
import { useNavigate } from 'react-router-dom';

const MainPublic = (data) => {
    const navigate = useNavigate();
    const getCardDetail = (item) => {
        navigate(`/camping/${item.contentId}?keyword=${item.facltNm}`);
    }
    const publicList = data?.cardData.response.body.items.item;
    let publicItem = [];
    if (publicList) {
        publicList.map(item=>{
            if (publicItem.length<5 && item.facltDivNm != '' 
                && item.facltDivNm != '민간' && item.firstImageUrl != '' 
                && item.mangeDivNm === '직영'&& !item.facltNm.includes('차')
                && !item.facltNm.includes('교육청') && !item.facltNm.includes('염전')
            ) {
                publicItem.push(item)
            }
        })
    }

  return (
    <Container className='mb-5'>
        <div className='public-area-title'>
            <spa className='public-container-title'>공공 기관 캠핑장</spa>
            {/* <span>여긴 어때?</span> */}
        </div>
        <div className='media-scroll'>
            <div className='public-card'>
                {publicItem?.map(item=>{
                    return (
                        <div
                            key={item.contentId}
                            className='public-card-margin'
                            onClick={()=>getCardDetail(item)}
                        >
                            <div
                                style={{backgroundImage:"url("+`${item.firstImageUrl}`+")"}}
                                className='public-card-item'
                            >
                                <div className='public-border'></div>
                                <div className='public-card-bg'>
                                    <div className='public-do'>{item.doNm}</div>
                                    <h2 className='public-name'>{item.facltNm}</h2>
                                    <div className='public-location'>
                                        <span className='public-location-color'>{item.lctCl}</span>
                                        <span className='public-camping-color'> 캠핑</span>
                                    </div>
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

export default MainPublic
