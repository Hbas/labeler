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
    var string = content[i].trim();
    if(string.length > 0){
      contentObjs.push({content: string});
    }
  }
  Data.insertMany(contentObjs, function(err, docs){
    if(err){
      next(new Error(err));
    }else{
      res.redirect('/label');
    }
  });
};

module.exports.submitLabel = function(req, res, next){
  if(!req.body.tags || !req.body.id){
    return res.status(400).send("Invalid tags");
  }
  var labels = req.body.tags.split(',');
  Data.update({ _id: req.body.id }, { $set: { labels: labels }}, function(err){
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

module.exports.labelPage = function(req,res, next){
  Data.getNextUnlabeled(function(err, data){
    if(err){
      next(new Error(err));
    }else if(data === null){
      Data.hasDataWithoutLabel(function(err, hasData){
        if(hasData){
          res.render("wait");
        }else{
          res.redirect("/charts");
        }
      });
    }else{
      data.labelerRequested = new Date().getTime();
      data.save(function(err){
        if(err){
          return next(new Error(err));
        }else{
          Data.getTags(function(err2, tags){
            if(err2){
              return next(new Error(err2));
            }
            res.render("dataLabel", {data: data, tags: tags});
          });
        }
      });
    }
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
