var mongoose = require('mongoose');

var Data = mongoose.model('Data', {
    researchId: ObjectId,
    content: String,
    tags: [String]
});

Data.getNextUnlabeled = function (researchId) {
    return Data.find({
        $or: [
            { labels: { $exists: false }, researchId: researchId },
            { labels: { $eq: [] }, researchId: researchId }
        ]
    });
};

Data.getTags = function () {
    return Data.distinct('tags');
};