import React, { useEffect, useState } from 'react';
import './KakaoMapLoader.style.css';
const { kakao } = window;

const KakaoMapLoader = () => {
    const [keyword, setKeyword] = useState('');
    const [map, setMap] = useState(null);
    const [infowindow, setInfowindow] = useState(null);
    const [currCategory, setCurrCategory] = useState('');
    const [lat, setLat] = useState(37.566826);
    const [lon, setLon] = useState(126.9786567);
    const ps = new kakao.maps.services.Places();
    const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 서울의 위도와 경도
        level: 3, // 지도의 확대 레벨
    };

    useEffect(() => {
        const newInfowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        setInfowindow(newInfowindow);

        addCategoryClickEvent();
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

    useEffect(() => {
        // currCategory가 변경될 때마다 호출되는 부분
        if (currCategory) {
            searchCategory();
        } else {
            removeMarker();
        }
    }, [currCategory]); // currCategory 상태가 변경될 때마다 실행

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

            setLat(map.getCenter().getLat());
            setLon(map.getCenter().getLng());

            // 지도에 필요한 컨트롤 추가
            addMapControls(map);
        });
    };

    // 카테고리의 클릭 이벤트
    const addCategoryClickEvent = () => {
        const category = document.getElementById('category');
        const children = category.children;

        for (let i = 0; i < children.length; i++) {
            children[i].onclick = onClickCategory;
        }
    };

    const onClickCategory = (e) => {
        const id = e.target.id;
        const className = e.target.className;

        if (className === 'on') {
            setCurrCategory('');
        } else {
            setCurrCategory(id);
            searchCategory();
        }
    };

    const searchCategory = () => {
        if (infowindow) {
            // infowindow 상태가 null이 아닌 경우에만 실행
            infowindow.setMap(null);
            removeMarker();
            ps.categorySearch(
                currCategory,
                (data, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        // displayMarker(data);
                        displayCategoryPlaces(data);
                    }
                },
                { useMapBounds: true, location: new kakao.maps.LatLng(lat, lon) }
            );
        }
    };
    // 키워드로 장소를 검색하는 함수
    const searchPlaces = (event) => {
        event.preventDefault();
        // const ps = new kakao.maps.services.Places();
        ps.keywordSearch(keyword, (data, status, _pagination) => {
            if (status === kakao.maps.services.Status.OK) {
                // displayMarker(data);
                displayPlaces(data);
                displayPagination(_pagination);
            }
        });
    };

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
            displayPlaces(data);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
            // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
        } else if (status === kakao.maps.services.Status.ERROR) {
            // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
        }
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
            setLat(latlng.getLat());
            setLon(latlng.getLng());

            // var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            // message += '경도는 ' + latlng.getLng() + ' 입니다';

            // var resultDiv = document.getElementById('clickLatlng');
            // resultDiv.innerHTML = message;
        });

        kakao.maps.event.addListener(map, 'dragend', function () {
            var latlng = map.getCenter();

            setLat(latlng.getLat());
            setLon(latlng.getLng());

            // var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
            // message += '경도는 ' + latlng.getLng() + ' 입니다';

            // var resultDiv = document.getElementById('dragResult');
            // resultDiv.innerHTML = message;
        });
        // kakao.maps.event.addListener(map, 'idle', searchCategory);
    };

    ////////////////////////////////////////////////////////////////
    // 마커를 담을 배열입니다
    const [markers, setMarkers] = useState([]);
    const displayPlaces = (places) => {
        var listEl = document.getElementById('placesList'),
            menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(),
            bounds = new kakao.maps.LatLngBounds(),
            listStr = '';

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for (var i = 0; i < places.length; i++) {
            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                marker = addMarker(placePosition, i),
                itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
            (function (marker, title) {
                kakao.maps.event.addListener(marker, 'mouseover', function () {
                    displayInfowindow(marker, title);
                });

                kakao.maps.event.addListener(marker, 'mouseout', function () {
                    infowindow.close();
                });

                itemEl.onmouseover = function () {
                    displayInfowindow(marker, title);
                };

                itemEl.onmouseout = function () {
                    infowindow.close();
                };
            })(marker, places[i]);

            fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        setLat(bounds.pa);
        setLon(bounds.ha);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    };

    const displayCategoryPlaces = (places) => {
        var listEl = document.getElementById('placesList'),
            menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(),
            bounds = new kakao.maps.LatLngBounds(),
            listStr = '';

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for (var i = 0; i < places.length; i++) {
            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                order = document.getElementById(currCategory).getAttribute('data-order'),
                marker = addCategoryMarker(placePosition, order),
                itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
            (function (marker, title) {
                kakao.maps.event.addListener(marker, 'mouseover', function () {
                    displayInfowindow(marker, title);
                });

                // kakao.maps.event.addListener(marker, 'mouseout', function () {
                //     infowindow.close();
                // });

                // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
                kakao.maps.event.addListener(marker, 'click', function () {
                    displayClickInputWindow(marker, title);
                });

                itemEl.onmouseover = function () {
                    displayInfowindow(marker, title);
                };

                itemEl.onmouseout = function () {
                    infowindow.close();
                };
            })(marker, places[i]);
            // 마커를 markers 배열에 추가

            fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    };

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    const displayPagination = (pagination) => {
        var paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
            var el = document.createElement('a');
            el.href = '#';
            el.innerHTML = i;

            if (i === pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function (i) {
                    return function () {
                        pagination.gotoPage(i);
                    };
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    };
    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    const displayInfowindow = (marker, title) => {
        var content = '<div style="padding:5px;z-index:2; white-space: nowrap;">' + title.place_name + '</div>';

        infowindow.setContent(content);
        infowindow.open(map, marker);
    };

    function closeOverlay() {
        infowindow.close(); // 닫힘 버튼 클릭 시 인포윈도우를 닫도록 수정
    }

    const displayClickInputWindow = (marker, title) => {
        var content =
            '<div class="wrap">' +
            '    <div class="info">' +
            '        <div class="title">' +
            title.place_name +
            '        </div>' +
            '        <div class="body">' +
            '            <div class="desc">' +
            '                <div class="ellipsis">' +
            title.address_name +
            '</div>' +
            '                <div class="jibun ellipsis">' +
            title.road_address_name +
            '</div>' +
            '                <div><a href="' +
            title.place_url +
            '" target="_blank" class="link">홈페이지</a></div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>';

        infowindow.setContent(content);
        infowindow.open(map, marker);
    };

    // 검색결과 목록의 자식 Element를 제거하는 함수입니다
    const removeAllChildNods = (el) => {
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
    };

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    const removeMarker = () => {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }

        setMarkers([]);
    };

    // 검색결과 항목을 Element로 반환하는 함수입니다
    const getListItem = (index, places) => {
        var el = document.createElement('li'),
            itemStr =
                '<span className="markerbg marker_' +
                (index + 1) +
                '"></span>' +
                '<div className="info">' +
                '<h5>' +
                places.place_name +
                '</h5>';

        if (places.road_address_name) {
            itemStr +=
                '<span>' +
                places.road_address_name +
                '</span>' +
                '<span className="jibun gray">' +
                places.address_name +
                '</span>';
        } else {
            itemStr += '<span>' + places.address_name + '</span>';
        }

        itemStr += '<span className="tel">' + places.phone + '</span>' + '</div>';

        el.innerHTML = itemStr;
        el.className = 'item';

        return el;
    };

    function addMarker(position, idx, title) {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
            imgOptions = {
                spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage,
            });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        // 배열에 생성된 마커를 추가합니다
        setMarkers((prevMarkers) => [...prevMarkers, marker]);

        return marker;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    const addCategoryMarker = (position, order) => {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
            imgOptions = {
                spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
                spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage,
            });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        // 배열에 생성된 마커를 추가합니다
        setMarkers((prevMarkers) => [...prevMarkers, marker]);

        return marker;
    };

    return (
        <div className="kakaoLoader">
            {/* <input type="text" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
            <button onClick={searchPlaces}>검색</button> */}

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
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
            <ul id="category">
                <li id="BK9" data-order="0">
                    <span class="category_bg bank"></span>
                    은행
                </li>
                <li id="MT1" data-order="1">
                    <span class="category_bg mart"></span>
                    마트
                </li>
                <li id="PM9" data-order="2">
                    <span class="category_bg pharmacy"></span>
                    약국
                </li>
                <li id="OL7" data-order="3">
                    <span class="category_bg oil"></span>
                    주유소
                </li>
                <li id="CE7" data-order="4">
                    <span class="category_bg cafe"></span>
                    카페
                </li>
                <li id="CS2" data-order="5">
                    <span class="category_bg store"></span>
                    편의점
                </li>
            </ul>
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
