const pjson = require("../../package.json");

module.exports.version = function (req, res) {
    res.send(pjson.version);
}

module.exports.home = function (req, res) {
    //TODO
    res.redirect("/researches");
}