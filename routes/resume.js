/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var resume_dal = require('../dal/resume_dal');
var account_dal = require('../dal/account_dal');

router.get('/all', function(req, res) {
    resume_dal.getAll(function(err, result) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            console.log(result);
            res.render('resume/resume_view_all', {resume: result});
        }
    });
});

router.get('/add', function(req, res){
    account_dal.getAll(function (err, result) {
       if(err) {res.send(err);}
       else {res.render('resume/resume_add', {account: result});}
    });
});

router.get('/insert', function(req, res) {
    resume_dal.insert(req.query, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.redirect(302, '/resume/all');
        }
    });
});

router.get('/edit', function(req, res){
    resume_dal.getinfo(req.query, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('resume/ResumeUpdate',
                {resume: result[0][0], account: result[1]});
        }
    });
});

router.get('/update', function(req, res){
    resume_dal.update(req.query, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.redirect(302, '/resume/all');
        }
    });

});



module.exports = router;