var Data = require("../models/data");

module.exports.home = function(req, res, next) {
  Data.hasDataWithoutLabel(function(err, hasData){
    if(err){
      next(new Error(err));
    }else if(hasData){
      res.redirect("/label");
    }else{
      res.redirect("/data");
    }
  });
};
