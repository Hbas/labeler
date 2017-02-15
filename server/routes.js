var homeHandler = require('./handlers/home');

module.exports = function (app) {
  app.get('/version', function (req, res) {
        res.send('0.0.1');
  });
  app.get('/', homeHandler.home);
};
