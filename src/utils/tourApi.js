import axios from 'axios';

const apiKey = process.env.REACT_APP_TOUR_API_KEY;

const api = axios.create({
    baseURL: 'https://apis.data.go.kr/B551011/KorService1',
    params: {
        numOfRows: 10,
        pageNo: 1,
        MobileOS: 'WIN',
        MobileApp: 'testApp',
        _type: 'json',
        serviceKey: 'Ax2gOM6GkDUSWs4UXnaJPC7Uo9n8mNaTNEG+0lEL0USRssJ68d2uZRCUeueuSWlthjuw1nQ3vo+ECh+jDsK/RQ==',
    },
});

export default api;
