var homeHandler = require('./handlers/home');
var dataHandler = require('./handlers/data');
var chartHandler = require('./handlers/charts');

module.exports = function (app) {
  app.get('/version', function (req, res) {
        res.send('0.0.1');
  });
  app.get('/', homeHandler.home);
  app.get('/data', dataHandler.inputPage);
  app.post('/data/new', dataHandler.submit);
  app.post('/data/label', dataHandler.submitLabel);
  app.post('/data/clear', dataHandler.clear);
  app.get('/label', dataHandler.labelPage);
  app.get('/download/labeled', dataHandler.listLabeled);
  app.get('/charts', chartHandler.showChart);
  app.get('/charts/data', chartHandler.chartData);
};
