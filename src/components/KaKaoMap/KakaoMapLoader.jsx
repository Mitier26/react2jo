import React, { useEffect, useState } from 'react';
import './KakaoMapLoader.style.css';
const { kakao } = window;

const KakaoMapLoader = () => {
    const [keyword, setKeyword] = useState('');
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    useEffect(() => {
        // 현재 위치를 가져와서 지도를 표시합니다.
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                loadKakaoMap(lat, lon);
            },
            (error) => {
                // 위치 정보를 가져오지 못한 경우 기본 위치를 설정하여 지도를 로드합니다.
                const defaultLat = 37.5665; // 서울의 위도
                const defaultLon = 126.978; // 서울의 경도
                loadKakaoMap(defaultLat, defaultLon);
                console.error('Error getting current location:', error);
            }
        );
    }, []);

    // 일반 지도를 표시하는 함수
    const loadKakaoMap = (lat, lon) => {
        kakao.maps.load(() => {
            var container = document.getElementById('map');
            var option = {
                center: new kakao.maps.LatLng(lat, lon),
                level: 3, // 보이는 범위
                isPanto: true, //부드럽게 이동
            };
            var map = new kakao.maps.Map(container, option);

            // 지도에 필요한 컨트롤 추가
            addMapControls(map);
        });
    };

    // 키워드로 장소를 검색하는 함수
    const searchKeyword = () => {
        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(keyword, (data, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                displayMarker(data);
            }
        });
    };

    // 지도에 마커를 표시하는 함수
    const displayMarker = (places) => {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
                level: 3, // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption);

        places.forEach((place) => {
            markers.push({
                position: new kakao.maps.LatLng(place.y, place.x),
                content: place.place_name,
            });
            bounds.extend(new kakao.maps.LatLng(place.y, place.x));
        });

        markers.forEach((markerInfo) => {
            var marker = new kakao.maps.Marker({
                map: map,
                position: markerInfo.position,
            });

            kakao.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + markerInfo.content + '</div>');
                infowindow.open(map, marker);
            });
        });

        map.setBounds(bounds);
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

    return (
        <div className="kakaoLoader">
            <input type="text" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
            <button onClick={searchKeyword}>검색</button>
            <div id="map" style={{ width: '500px', height: '400px' }}></div>
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
