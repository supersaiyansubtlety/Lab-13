/**
 * Created by student on 3/29/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM school_adr;';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO school (school_name, address_id) VALUES (?,?)';
    var queryData = [params.school_name, params.address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result.insertId);
    });
};

exports.getinfo = function(params, callback) {
    var query = 'CALL school_getinfo_edit(?);';
    var queryData = [params];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE school SET school_name = ?, address_id = ? WHERE school_id = ?;';
    var queryData = [params.school_name, params.address_id, params.school_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result, params.school_name);
    });
};

exports.delete = function (params, callback) {
    console.log("del_dal");
    console.log(params.school_id);
    exports.getinfo(params.school_id, function (err, result) {
        if (err) {
            console.log("ERROR:");
            console.log(err);
        } else {
            console.log(result);
            var school_name = result[0][0].school_name;
            var query = "DELETE FROM school WHERE school_id = ?";
            var queryData = [params.school_id];

            connection.query(query, queryData, function(err, result){
                callback(err, school_name);
            });
        }
    });

};

