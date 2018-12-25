var express = require('express');
var router = express.Router();

router.get('/register/:lectureID', function(req, res){

    let check = req.params.lectureID + req.query.studentID;

    var checksum = 0;

    for (var i = 0; i < check.length; i++){

        checksum = checksum + (check.charCodeAt(i) * 256);

    }

    if (checksum == req.query.checksum){

        let Attendance = require('../models/attendance');

        var sessionID = "";

        for (var i = 0; i < 4; i++) {
            sessionID += Math.trunc(Math.random() * (10-1) + 1);
        }

        let register = new Attendance({
            sessionID : sessionID,
            lectureID : req.params.lectureID,
            studentID : req.query.studentID
        });

        Attendance.registerStudent(register, function(err, result){
            if (err) throw err;
            console.log(result);
        });

        res.send("Attendance Registered: postHash = " + checksum + " preHash = " + check);

    }else{

        res.send("Error: Incorrect checksum.");

    }

});

module.exports = router;
