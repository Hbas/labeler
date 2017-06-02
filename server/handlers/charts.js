var Data = require("../models/data");

module.exports.showChart = function(req,res, next){
  res.render("charts");
};

module.exports.chartData = function(req,res, next){
  //TODO Implement
  res.json([
    ["Label","Percentage"],
    ["labelA",3],
    ["labelB",2]
  ]);
};
