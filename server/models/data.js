var mongoose = require('mongoose');
var moment = require('moment');

var SECONDS = 1000;
var LABELING_TIMEOUT = 10 * SECONDS;

var Data = mongoose.model('Data', {
    labelerRequested: Date,
    content: String,
    labels: [String]
});

Data.hasDataWithoutLabel = function(callback){
  Data.find({$or: [{labels: {$exists: false}}, {labels: {$eq: []}} ]}, function(err, data){
    if(err){
      callback(err,null);
    }else{
      callback(null, data.length > 0);
    }
  });
};

Data.getNextUnlabeled = function(callback){
  var now = new Date().getTime();
  var expiration =  now - LABELING_TIMEOUT;
  Data.find({$or: [
    {labels: {$exists: false}, labelerRequested: {$exists: false}},
    {labels: {$exists: false}, labelerRequested: {$lt: expiration}},
    {labels: {$eq: []}, labelerRequested: {$exists: false}},
    {labels: {$eq: []}, labelerRequested: {$lt: expiration}}
  ]}, function(err, data){
    if(err){
      callback(err, null);
    }else if(data.length === 0){
      callback(null, null);
    }else {
      callback(null, data[0]);
    }
  });
};

Data.getTags = function(callback){
  Data.distinct('labels', callback);
};


module.exports = Data;
