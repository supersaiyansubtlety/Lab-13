/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var school_dal = require('../dal/school_dal');
var address_dal = require('../dal/address_dal');

router.get('/all', function(req, res) {
    school_dal.getAll(function(err, result) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('school/school_view_all',
                {
                    school: result,
                    noti: req.query.noti,
                    school_name: req.query.school_name
                });
        }
    });
});

router.get('/add', function(req, res){
    address_dal.getAll(function (err, result) {
       if(err) {res.send(err);}
       else {res.render('school/school_add', {address: result [0]});}
    });
});

router.get('/insert', function(req, res) {
    school_dal.insert(req.query, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.redirect(302, '/school/all/?school_id=' + result + '&noti=added&school_name=' + req.query.school_name);
        }
    });
});

router.get('/edit', function(req, res){
    school_dal.getinfo(req.query.school_id, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.render('school/SchoolUpdate',
                {school: result[0][0], address: result[1]});
        }
    });
});

router.get('/update', function(req, res){
    school_dal.update(req.query, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {res.redirect(302, '/school/all/?noti=updated&school_name=' + req.query.school_name);
        }
    });

});

router.get('/delete', function(req, res){
    school_dal.delete(req.query, function (err, result) {
        if (err) {
            console.log("ERROR:");
            console.log(err);
            res.redirect(500, '/school/all/?noti=err&error=' + err);
        } else {
            res.redirect(302, '/school/all/?noti=deleted&school_name=' + result);
        }
    });

});

module.exports = router;