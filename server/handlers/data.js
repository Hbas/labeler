var Data = require("../models/data");

module.exports.inputPage = function(req,res){
  res.render("dataInput");
};

module.exports.submit = function(req, res, next){
  var data = req.body.newData;
  if(!data){
    return res.status(400).send("Invalid data");
  }
  var content = data.split('\n');
  var contentObjs = [];
  for(var i = 0; i < content.length;i++){
    contentObjs.push({content: content[i].trim()});
  }
  Data.insertMany(contentObjs, function(err, docs){
    if(err){
      next(new Error(err));
    }else{
      res.redirect('/label');
    }
  });
};

module.exports.clear = function(req, res, next){
  Data.remove({}, function(err, data){
    if(err){
      next(new Error(err));
    }else{
      res.redirect('/');
    }
  });
};

module.exports.labelPage = function(req,res){
  Data.getNextUnlabeled(function(err, data){
    res.render("dataLabel", data);
  });
};

module.exports.listLabeled = function(req, res, next) {
  Data.find({labels: {$gt: []}}, function(err, data){
    if(err){
      next(new Error(err));
    }else{
      res.attachment("labeledData.json");
      res.json(data);
    }
  });
};
