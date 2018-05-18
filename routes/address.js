/**
 * Created by student on 3/15/18.
 */
var express = require('express');
var router = express.Router();
var address_dal = require('../dal/address_dal');

router.get('/all', function(req, res) {
    address_dal.getAll(function(err, result) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.render('address/address_view_all',
            {   address: result[0],
                noti: req.query.noti,
                street: req.query.street
            });
        }
    });
});

router.get('/add', function(req, res){
    res.render('address/address_add');
});

router.get('/insert', function(req, res) {
    address_dal.insert(req.query, function(err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.redirect(302, '/address/all/?address_id=' + result + '&noti=added&street=' + req.query.street);
        }
    });
});

router.get('/edit', function(req, res){
    address_dal.getinfo(req.query.address_id, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.render('address/AddressUpdate',
                {address: result[0][0]});
        }
    });
});

router.get('/update', function(req, res){
    address_dal.update(req.query, function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.redirect(302, '/address/all/?noti=updated&street=' + req.query.street);
        }
    });

});

router.get('/delete', function(req, res){
    address_dal.delete(req.query, function (err, result) {
        if (err) {
            console.log("ERROR:");
            console.log(err);
            res.redirect(500, '/address/all/?noti=err&error=' + err);
        } else {
            res.redirect(302, '/address/all/?noti=deleted&street=' + result);
        }
    });

});



module.exports = router;