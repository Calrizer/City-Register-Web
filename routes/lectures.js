var express = require('express');
var router = express.Router();

router.get('/:lectureID', function(req, res){

    let Lecture = require('../models/lecture');
    let Attendance = require('../models/attendance');
    let Student = require('../models/student');

    Lecture.getLectureByID(req.params.lectureID, function (err, lecture) {

        if(err) {
            throw err;
        }else{

            Attendance.getStudentsByLectureID(req.params.lectureID, function (err, students) {

                if(err) {
                    throw err;
                }else{

                    var registered = [];

                    students.forEach(function(item) {

                        Student.getStudentByStudentID(item.studentID, function (err, student) {
                            console.log(student);
                            registered.push(student);

                            if (registered.length == students.length){

                                console.log(registered);

                                res.render('lecture', {
                                    lecture: lecture,
                                    students: registered
                                });

                            }

                        });

                    });

                }

            })

        }

    });

});

module.exports = router;