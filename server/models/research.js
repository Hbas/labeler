var mongoose = require('mongoose');

var Research = mongoose.model('Research', {
    name: String
});

module.exports = Research;