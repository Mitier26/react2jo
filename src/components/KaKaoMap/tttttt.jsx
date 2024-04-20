import React, { useEffect, useState } from 'react';
import './KakaoMapLoader.style.css';
const { kakao } = window;

const KakaoMapLoader = () => {
    const [keyword, setKeyword] = useState('');
    const [map, setMap] = useState(null);
    const [infowindow, setInfowindow] = useState(null);
    const [markers, setMarkers] = useState([]);
    const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 서울의 위도와 경도
        level: 3, // 지도의 확대 레벨
    };

    useEffect(() => {
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        setInfowindow(infowindow);

        // 현재 위치를 가져와서 지도를 표시합니다.
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude: lat, longitude: lon } = position.coords;
                loadKakaoMap(lat, lon);
            },
            (error) => {
                // 위치 정보를 가져오지 못한 경우 기본 위치를 설정하여 지도를 로드합니다.
                const defaultLat = 37.5665; // 서울의 위도
                const defaultLon = 126.978; // 서울의 경도
                loadKakaoMap(defaultLat, defaultLon);
                console.error('현재 위치를 가져오지 못했습니다:', error);
            }
        );
    }, []);

    // 일반 지도를 표시하는 함수
    const loadKakaoMap = (lat, lon) => {
        kakao.maps.load(() => {
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(lat, lon),
                level: 3, // 보이는 범위
                isPanto: true, //부드럽게 이동
            };
            const map = new kakao.maps.Map(container, options);
            setMap(map);

            // 지도에 필요한 컨트롤 추가
            addMapControls(map);
        });
    };

    // 키워드로 장소를 검색하는 함수
    const searchPlaces = (event) => {
        event.preventDefault();
        console.log(keyword);
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(keyword, (data, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                displayPlaces(data);
                displayPagination(_pagination);
            }
        });
    };

    // 지도에 필요한 컨트롤을 추가하는 함수
    const addMapControls = (map) => {
        var mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        var marker = new kakao.maps.Marker({
            position: map.getCenter(),
        });
        marker.setMap(map);

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            var latlng = mouseEvent.latLng;
            marker.setPosition(latlng);

            var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';

            var resultDiv = document.getElementById('clickLatlng');
            resultDiv.innerHTML = message;
        });

        kakao.maps.event.addListener(map, 'dragend', function () {
            var latlng = map.getCenter();

            var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';

            var resultDiv = document.getElementById('dragResult');
            resultDiv.innerHTML = message;
        });
    };

    ////////////////////////////////////////////////////////////////

    // 검색결과를 표시하고 지도에 마커를 추가하는 함수
    const displayPlaces = (places) => {
        const bounds = new kakao.maps.LatLngBounds();
        removeMarker(); // 이전에 표시된 마커들을 제거

        places.forEach((place, index) => {
            const position = new kakao.maps.LatLng(place.y, place.x);
            const marker = addMarker(position, index);
            bounds.extend(position); // 검색된 장소들의 위치를 지도 범위에 추가

            // 마커 클릭 시 인포윈도우에 장소명 표시
            kakao.maps.event.addListener(marker, 'click', function () {
                displayInfowindow(marker, place.place_name);
            });
        });

        map.setBounds(bounds); // 검색된 장소들이 모두 보이도록 지도의 범위를 재설정
    };

    // 검색결과 목록의 페이지번호를 표시하는 함수
    const displayPagination = (pagination) => {
        const paginationEl = document.getElementById('pagination');
        const fragment = document.createDocumentFragment();

        for (let i = 1; i <= pagination.last; i++) {
            const el = document.createElement('a');
            el.href = '#';
            el.innerHTML = i;
            el.onclick = () => pagination.gotoPage(i);

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    };

    // 인포윈도우에 장소명을 표시하는 함수
    const displayInfowindow = (marker, title) => {
        const content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
        infowindow.setContent(content);
        infowindow.open(map, marker);
    };

    // 지도 위에 마커를 추가하고 상태를 업데이트하는 함수
    const addMarker = (position, idx) => {
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
        const imageSize = new kakao.maps.Size(36, 37);
        const imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691),
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
            offset: new kakao.maps.Point(13, 37),
        };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);

        const marker = new kakao.maps.Marker({
            position: position,
            image: markerImage,
        });

        marker.setMap(map); // 지도에 마커 추가
        setMarkers([...markers, marker]); // 마커 배열 업데이트

        return marker;
    };

    // 지도 위에 표시된 모든 마커를 제거하는 함수
    const removeMarker = () => {
        markers.forEach((marker) => marker.setMap(null)); // 각 마커의 지도에서 제거
        setMarkers([]); // 마커 배열 초기화
    };

    return (
        <div className="kakaoLoader">
            <div id="menu_wrap" className="bg_white">
                <div className="option">
                    <div>
                        <form onSubmit={(event) => searchPlaces(event)}>
                            {' '}
                            <input
                                type="text"
                                id="keyword"
                                size="15"
                                onChange={(event) => setKeyword(event.target.value)}
                            />
                            <button type="submit">검색하기</button>
                        </form>
                    </div>
                </div>
                <ul id="placesList"></ul>
                <div id="pagination"></div>
            </div>
            <div id="map" style={{ width: '100%', height: '400px' }}></div>
            <p>
                <input type="checkbox" id="chkTraffic" /> 교통정보 보기
                <input type="checkbox" id="chkBicycle" /> 자전거도로 정보 보기
            </p>
            <div id="clickLatlng"></div>
            <div id="dragResult"></div>
        </div>
    );
};

export default KakaoMapLoader;
