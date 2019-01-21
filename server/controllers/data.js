const errorHelper = require("../helpers/error");

module.exports.labelPage = function (req, res) {
    res.render("dataLabel", { data: { _id: req.params.id, content: "teste" }, tags: [] });
}

module.exports.addSentences = function (req, res) {
    res.status(501).send();
}

module.exports.put = function (req, res) {
    res.status(501).send();
}

module.exports.validation = {};