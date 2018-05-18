/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var skill_dal = require('../dal/skill_dal');

router.get('/all', function(req, res, next) {
    skill_dal.getAll(function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.render('skill/skill_view_all',
                {
                    skill: result,
                    noti: req.query.noti,
                    skill_name: req.query.skill_name
                });
        }
    })
});

router.get('/add', function(req, res){
    res.render('skill/skill_add');
})

router.get('/insert', function(req, res) {
    skill_dal.insert(req.query, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.redirect(302, '/skill/all/?skill_id=' + result + '&noti=added&skill_name=' + req.query.skill_name);
        }
    });
});

router.get('/edit', function(req, res){
    skill_dal.getinfo(req.query.skill_id, function (err, result) {
        if (err) {res.send(err); }
        else {
            console.log("skill_id:");
            console.log(req.query.skill_id);
            console.log("result:");
            console.log(result);
            res.render('skill/SkillUpdate',
                {skill: result[0][0]}
            );
        }
    });
});

router.get('/update', function(req, res){
    skill_dal.update(req.query, function(err, result) {
        if (err) {res.send(err); }
        else {res.redirect(302, '/skill/all/?noti=updated&skill_name=' + req.query.skill_name); }
    });
});

router.get('/delete', function(req, res){
    skill_dal.delete(req.query, function (err, result) {
        if (err) {
            console.log("ERROR:");
            console.log(err);
            res.redirect(500, '/skill/all/?noti=err&error=' + err);
        } else {
            res.redirect(302, '/skill/all/?noti=deleted&skill_name=' + result);
        }
    });

});

module.exports = router;