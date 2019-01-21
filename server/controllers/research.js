const errorHelper = require("../helpers/error");
const researchModel = require("../models/research");

module.exports.listPage = function (req, res) {
    res.status(501).send();
}

module.exports.create = function (req, res) {
    res.status(501).send();
}

module.exports.remove = function (req, res) {
    res.status(501).send();
}

module.exports.rename = function (req, res) {
    res.status(501).send();
}

module.exports.addDataPage = function (req, res) {
    res.render("dataInput", { research: { _id: req.params.id } });
}

module.exports.validation = {};

module.exports.validation.hasName = function (req, res, next) {
    if (!req.body || !req.body.name) {
        return errorHelper.error(404, "Missing name parameter", res);
    }
    next();
}


module.exports.validation.hasResearchWithId = async function (req, res, next) {
    try {
        let hasResearch = await researchModel.findById(req.params.id);
        if (!hasResearch) {
            return errorHelper.error(404, `Research with ID ${req.params.id} not found`, res);
        }
    } catch (err) {
        return errorHelper.error(err, res);
    }
    next();
}