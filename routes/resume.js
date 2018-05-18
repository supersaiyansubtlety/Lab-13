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
            res.render('resume/resume_view_all', {resume: result, noti: req.query.noti, resume_name: req.query.resume_name});
        }
    });
});

router.get('/add/detail', function(req, res){
    resume_dal.get_option_info(req.query, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.render
            (
                'resume/resume_add_detail',
                {
                    account_id: result[0][0].account_id,
                    company: result[1],
                    school: result[2],
                    skill: result[3]
                }
            );
        }
    });
});

router.get('/add/selectuser', function(req, res){
    account_dal.getAll(function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.render('resume/resume_add_selectuser',
                {account: result});
        }
    });
});

router.get('/insert', function(req, res) {
    resume_dal.insert(req.query, function(err, result) {

        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.redirect (302, '/resume/edit/?resume_id=' + result + '&noti=added');
        }
    });
});

router.get('/edit', function(req, res){
    resume_dal.get_edit_info(req.query, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.render('resume/ResumeUpdate',
                {
                    noti: req.query.noti,
                    resume: result[0][0],
                    pre_company: result[1],
                    pre_school: result[2],
                    pre_skill: result[3],
                    all_company: result[4],
                    all_school: result[5],
                    all_skill: result[6]
                });
        }
    });
});

router.get('/update', function(req, res){
    resume_dal.update(req.query, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.redirect(302, '/resume/edit/?resume_id=' + req.query.resume_id + '&noti=updated');
        }
    });

});

router.get('/delete', function(req, res){
    resume_dal.delete(req.query, function (err, result) {
        if (err) {
            console.log(err);
            res.redirect(500, '/resume/all/?noti=err&error=' + err);
        } else {
            res.redirect(302, '/resume/all/?noti=deleted&resume_name=' + result);
        }
    });

});



module.exports = router;