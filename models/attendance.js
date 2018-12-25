var mongoose = require('mongoose');

// Lecture Schema
var AttendanceSchema = mongoose.Schema({
    sessionID: {
        type: String,
        index: true
    },
    studentID: {
        type: String
    },
    lectureID: {
        type: String
    }
});

var Attendance = module.exports = mongoose.model('Attendance', AttendanceSchema);

module.exports.getAttendanceByLectureID = function(lect, callback){

    var query = {lectureID : lect};
    console.log(lect);
    Attendance.find(query, callback);

}