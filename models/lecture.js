var mongoose = require('mongoose');

// Lecture Schema
var LectureSchema = mongoose.Schema({
    lectureID: {
        type: String,
        index: true
    },
    title: {
        type: String
    },
    lecturer: {
        type: String
    },
    description: {
        type: String
    }
});

var Lecture = module.exports = mongoose.model('Lecture', LectureSchema);

module.exports.getLectureByID = function(lect, callback){

    var query = {lectureID : lect};
    Lecture.findOne(query, callback);

}

module.exports.createLecture = function (newLecture, callback) {

    newLecture.save(callback);

}