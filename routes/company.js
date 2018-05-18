/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var company_dal = require('../dal/company_dal');
var address_dal = require('../dal/address_dal');

router.get('/all', function(req, res, next) {
    company_dal.getAll(function(err, result) {
        if(err) {
            console.log("ERROR:");
            console.log(err);
            res.send(err);
        } else {
            res.render('company/company_view_all',
                {
                    companies: result, 
                    noti: req.query.noti,
                    company_name: req.query.company_name,
                });
        }
    })
//    res.render('company/company_view_all');
});

router.get('/add', function(req, res) {
    address_dal.getAll(function(err,result) {
        if (err)
        {
            res.send(err);
        }
        else
        {
            res.render('company/company_add', {address_result: result[0]});
        }
    });
});

router.get('/insert', function(req, res) {
    company_dal.insert(req.query, function(err, result) {
        if (err) {
            console.log("ERROR:");
            console.log(err);
            res.send(err);
        } else {
            res.redirect(302, '/company/all/?company_id=' + result + '&noti=added&company_name=' + req.query.company_name);
        }
    });
});

router.get('/edit', function(req, res) {
    company_dal.getinfo(req.query.company_id, function(err,result) {
        if (err) {res.send(err); }
        else {
            res.render('company/CompanyUpdate',
                {company: result[0][0], address_result: result[1]}
            );
        }
    });
});

router.get('/update', function(req, res) {
    company_dal.getinfo(req.query.company_id, function (err, result) {
        var company_name = result[0][0].company_name;
        company_dal.update(req.query, function(err, result){
            if (err) {res.send(err); }
            else {res.redirect(302, '/company/all/?noti=updated&company_name=' + company_name); }
        });
    });
});

router.get('/delete', function(req, res){
    company_dal.delete(req.query, function (err, result) {
        if (err) {
            console.log("ERROR:");
            console.log(err);
            res.redirect(500, '/company/all/?noti=err&error=' + err);
        } else {
            res.redirect(302, '/company/all/?noti=deleted&company_name=' + result);
        }
    });

});

module.exports = router;