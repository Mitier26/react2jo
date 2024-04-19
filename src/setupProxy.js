const { createProxyMiddleware } = require('http-proxy-middleware');

// 미들웨어

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/locationBasedList1', {
            target: 'https://apis.data.go.kr/B551011/KorService1',
            changeOrigin: true,
        })
    );
    app.use(
        createProxyMiddleware('/searchFestival1', {
            target: 'https://apis.data.go.kr/B551011/KorService1',
            changeOrigin: true,
        })
    );
};
