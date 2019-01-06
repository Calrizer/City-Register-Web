var express = require('express');
var router = express.Router();

var Lecture = require('../models/lecture');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

router.get('/new', ensureAuthenticated, function(req, res){
    res.render('new');
});

router.post('/new', ensureAuthenticated, function(req, res){

    let title = req.body.title;
    let description = req.body.description;

    var lectureID = "";

    for (var i = 0; i < 4; i++) {
        lectureID += Math.trunc(Math.random() * (10-1) + 1);
    }

    Lecture.getLectureByID(lectureID, function(err, lect) {

    	if (lect == null){

            var newLecture = new Lecture({
                lectureID : lectureID,
                title : title,
                description : description,
                lecturer: req.user.name,
                students: []
            });

            Lecture.createLecture(newLecture, function(err, lecture){
                if (err) throw err;
                console.log(lecture);
            });

            res.redirect('/lectures/' + lectureID);

		}else{

    		req.flash('error_msg', 'An unexpected error occurred, please try again.');
    		res.redirect('/new');

		}

    });

});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;