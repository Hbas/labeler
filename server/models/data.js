var mongoose = require('mongoose');

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
  Data.find({labels: {$eq: []}}, function(err, data){
    if(err){
      callback(err,null);
    }else if(data.length === 0){
      callback("Dont have unlabeled data");
    }else {
      callback(null, data[0]);
    }
  });
};


module.exports = Data;
