/**
 * Created by student on 3/29/18.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'CALL address_getall();';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO address (street, zip_code) VALUES (?,?)';
    var queryData = [params.street, params.zip_code];

    connection.query(query, queryData, function(err, result) {
        callback(err, result.insertId);
    });
};

exports.getinfo = function(params, callback) {
    var query = 'CALL address_getinfo(?);';
    var queryData = [params];

    connection.query(query, queryData, function(err, result) {
        console.log(result);
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE address SET street = ?, zip_code = ? WHERE address_id = ?;';
    var queryData = [params.street, params.zip_code, params.address_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result, params.street);
    });
};

exports.delete = function (params, callback) {
    exports.getinfo(params.address_id, function (err, result) {
        if (err) {
            console.log("ERROR:");
            console.log(err);
        } else {
            console.log(result);
            var street = result[0][0].street;
            var query = "DELETE FROM address WHERE address_id = ?";
            var queryData = [params.address_id];

            connection.query(query, queryData, function(err, result){
                callback(err, street);
            });
        }
    });

};