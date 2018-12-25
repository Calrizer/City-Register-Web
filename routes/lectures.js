var express = require('express');
var router = express.Router();

router.get('/:lectureID', function(req, res){

    let Lecture = require('../models/lecture');
    let Attendance = require('../models/attendance');

    Lecture.getLectureByID(req.params.lectureID, function (err, lecture) {

        console.log(lecture);

        if(err) {
            throw err;
        }else{

            Attendance.getAttendanceByLectureID(req.params.lectureID, function (err, students) {

                console.log(students);

                if(err) {
                    throw err;
                }else{

                    res.render('lecture', {
                        lecture: lecture,
                        students: students
                    });

                }

            })

        }

    });

});

module.exports = router;