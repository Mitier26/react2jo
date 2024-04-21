import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useCampingDetail } from '../../hooks/useCampingDetail';
import { Container, Spinner, Alert, Badge } from 'react-bootstrap';
import '../CampingDetailPage/Camping_Detail.css';
import dog from '../../assets/dog.png';
import FestivalDetailPage from '../FestivalDetailPage/FestivalDetailPage';
import isLoadingSpinner from '../../common/Spinner/isLoadingSpinner';
import phone from '../../assets/phone.png';

const CampingDetailPage = () => {
    const { id } = useParams();
    const [addr] = useSearchParams();
    const keyword = addr.get('keyword');
    const { data, isLoading, error, isError } = useCampingDetail({ params: id, keyword: keyword });

    console.log(data);

    if (isLoading) {
        return <div>{isLoadingSpinner()}</div>;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return (
        <Container>
            {data?.map((item) => (
                <div key={item.id} className="DetailContainer">
                    <tr key={item.id}>
                            <td>
                                <div className="DetailImageContainer">
                                    <img src={item.firstImageUrl} alt="Camping Image" className="DetailImage" />
                                </div>
                            </td>
                        </tr>
                        <h3>{item.facltNm}</h3>
                        <div>{item.addr1}</div>
                        <div className="reservationBtn">
                            <a href={item.homepage}>예약하러 가기</a>
                        </div>
                    <div className="DetailInfoContainer">
                        <h4 className="DetailIntroTitle">어떤 장소인가요?</h4>
                        <div className="answerInfo">
                            {item.intro ? <div>{item.intro}</div> : <div>자세한 정보가 나와있지 않아요ㅠ</div>}
                        </div>
                        <h4 className="DetailIntroTitle">어떤 특징을 가지고 있나요?</h4>
                        <div className="answerInfo">
                            {item.lineIntro ? (
                                <div>{item.lineIntro}</div>
                            ) : (
                                <div> 자세한 정보가 나와있지 않아요ㅠ </div>
                            )}
                        </div>
                        <h4 className="DetailIntroTitle">근처 즐길만한 시설이 있나요?</h4>
                        <div className="answerInfo">
                            {item?.posblFcltyCl.split(',').map((facility, index) => (
                                <Badge key={index} bg="danger" className="me-1">
                                    {facility}
                                </Badge>
                            ))}
                        </div>
                        <h4 className="DetailIntroTitle">무엇이 준비되어있나요?</h4>
                        <div className="answerInfo">
                            {item?.sbrsCl.split(',').map((facility, index) => (
                                <Badge key={index} bg="danger" className="me-1">
                                    {facility}
                                </Badge>
                            ))}
                        </div>
                        <h4 className="DetailIntroTitle">어떤 시설인가요?</h4>
                        <div className="answerInfo">{item.brazierCl}시설 입니다.</div>
                        <h4 className="DetailIntroTitle">
                            <img className="dogImage" src={dog} /> 반려동물과 함께 사용할 수 있나요?
                        </h4>
                        <div className="answerInfo">{item.animalCmgCl} 합니다.</div>
                    </div>
                    <div className="EtcInfoContainer">
                        <h4>기타 정보</h4>
                        <div className="EtcList">
                            <div>
                                예약 방법 : {item.resveCl ? <>{item.resveCl}</> : '자세한 정보가 나와있지 않아요.'}
                            </div>
                            <div>
                                <img className="phoneImage" src={phone} alt="Phone Image" />
                                &nbsp;{item.tel ? <>{item.tel}</> : '자세한 정보가 나와있지 않아요.'}
                            </div>
                        </div>
                    </div>
                    {item.mapX && item.mapY && <FestivalDetailPage key={item.id} mapX={item.mapX} mapY={item.mapY} />}
                </div>
            ))}
        </Container>
    );
};
export default CampingDetailPage;
