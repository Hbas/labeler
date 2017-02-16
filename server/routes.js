var homeHandler = require('./handlers/home');
var dataHandler = require('./handlers/data');

module.exports = function (app) {
  app.get('/version', function (req, res) {
        res.send('0.0.1');
  });
  app.get('/', homeHandler.home);
  app.get('/data', dataHandler.inputPage);
  app.post('/data/new', dataHandler.submit);
  app.post('/data/clear', dataHandler.clear);
  app.get('/label', dataHandler.labelPage);
  app.get('/data/labeled', dataHandler.listLabeled);
};
