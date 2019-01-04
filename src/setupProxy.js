const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/fangman', {
      target: 'http://dashboard.api.leekerlabs.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/fangman': ''
      }
    })
  );
  app.use(
    proxy('/log', {
      target: 'http://passport.leekerlabs.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/log': ''
      }
    })
  );
  app.use(
    proxy('/third', {
      target: 'http://dashboard.api.leekerlabs.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/third': ''
      }
    })
  );
};
