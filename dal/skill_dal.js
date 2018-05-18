/**
 * Created by student on 3/29/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM skill;';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO skill (skill_name, description) VALUES (?,?)';

    var queryData = [params.skill_name, params.description];

    connection.query(query, queryData, function(err, result) {
        callback(err, result.insertId);
    });
};

exports.getinfo = function (params, callback) {
    var query = 'CALL skill_getinfo(?);';
    var queryData = [params];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE skill SET skill_name = ?, description = ? WHERE skill_id = ?'
    var queryData = [params.skill_name, params.description, params.skill_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result, params.school_name);
    });
};

exports.delete = function (params, callback) {
    console.log("del_dal");
    console.log(params.skill_id);
    exports.getinfo(params.skill_id, function (err, result) {
        if (err) {
            console.log("ERROR:");
            console.log(err);
        } else {
            console.log(result);
            var skill_name = result[0][0].skill_name;
            var query = "DELETE FROM skill WHERE skill_id = ?";
            var queryData = [params.skill_id];

            connection.query(query, queryData, function(err, result){
                callback(err, skill_name);
            });
        }
    });

};