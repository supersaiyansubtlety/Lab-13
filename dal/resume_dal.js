/**
 * Created by student on 3/29/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM resume_account;';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO resume (resume_name, account_id) VALUES (?,?)';
    var queryData = [params.resume_name, params.account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getinfo = function(params, callback) {
    var query = 'SELECT * FROM resume_adr WHERE resume_id = ?;';
    var queryData = [params.resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getinfo = function(params, callback) {
    var query = 'CALL resume_all_accounts(?);';
    var queryData = [params.resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE resume SET resume_name = ?, account_id = ? WHERE resume_id = ?;';
    var queryData = [params.resume_name, params.account_id, params.resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

