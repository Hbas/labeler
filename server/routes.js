var system = require('./controllers/system');
var research = require('./controllers/research');
var data = require('./controllers/data');

module.exports = function (app) {
  app.get('/version', system.version);
  app.get('/', system.home);
  app.get('/researches', research.listPage);
  app.post('/researches/new', research.create);
  app.delete('/researches/:id', research.remove);
  app.put('/researches/:id/name', research.validation.hasName, research.rename);
  app.get('/researches/:id/data', research.addDataPage);

  app.get('/data/:id/sentences/next', data.labelPage);
  app.post('/data/sentences', data.addSentences);
  app.post('/data/label', data.put);
};
