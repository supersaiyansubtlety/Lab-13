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

        ////insert company association
        if(err || params.company_id === undefined) {
            console.log(err);
            callback(err, result);
        } else {
            var resume_id = result.insertId;
            var query = 'INSERT INTO resume_company(resume_id, company_id) VALUES ?';
            var resumeCompanyData = [];
            if (params.company_id.constructor === Array) {
                for(var i = 0; i < params.company_id.length; i++) {
                    resumeCompanyData.push(
                        [resume_id, params.company_id[i]]
                    );
                }
            } else {
                resumeCompanyData.push(
                    [resume_id, params.company_id]
                );
            }
            connection.query(query, [resumeCompanyData], function(err, result) {
                ////insert school association
                query = 'INSERT INTO resume_school(resume_id, school_id) VALUES ?';
                resumeSchoolData = [];
                if (params.school_id.constructor === Array) {
                    for(var i = 0; i < params.school_id.length; i++) {
                        resumeSchoolData.push(
                            [resume_id, params.school_id[i]]
                        );
                    }
                } else {
                    resumeSchoolData.push(
                        [resume_id, params.school_id]
                    );
                }
                connection.query(query, [resumeSchoolData], function(err, result) {
                    ////insert skill associations
                    query = 'INSERT INTO resume_skill(resume_id, skill_id) VALUES ?';
                    resumeSkillData = [];
                    if (params.skill_id.constructor === Array) {
                        for(var i = 0; i < params.skill_id.length; i++) {
                            resumeSkillData.push(
                                [resume_id, params.skill_id[i]]
                            );
                        }
                    } else {
                        resumeSkillData.push(
                            [resume_id, params.skill_id]
                        );
                    }
                    connection.query(query, [resumeSkillData], function(err, result) {
                        callback(err, resume_id);
                    });
                });
            });
        }
    });
};

exports.get_option_info = function(params, callback) {
    var query = 'CALL resume_get_option_info(?);';
    var queryData = [params.account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.get_edit_info = function(params, callback) {
    var query = 'CALL resume_get_edit_info(?);';
    var queryData = [params.resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

var getinfo = function(resume_id, callback) {
    var query = 'SELECT resume_name FROM resume WHERE resume_id = ?;';
    var queryData = [resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result[0].resume_name);
    });
};

////company local functions
var resumeCompanyInsert = function(resume_id, companyIdArray, callback){
    var query = 'INSERT INTO resume_company (resume_id, company_id) VALUES ?';
    var resumeCompanyData = [];
    if (companyIdArray.constructor === Array) {
        for (var i = 0; i < companyIdArray.length; i++) {
            resumeCompanyData.push([resume_id, companyIdArray[i]]);
        }
    }
    else {
        resumeCompanyData.push([resume_id, companyIdArray]);
    }
    connection.query(query, [resumeCompanyData], function(err, result){
        callback(err, result);
    });
};
var resumeCompanyUpdate = function(resume_id, companyIdArray, callback) {
    var query = 'CALL resume_company_delete(?)';
    connection.query(query, resume_id, function(err, result) {
        if(err || companyIdArray === undefined) {
            callback(err, result);
        } else {
            resumeCompanyInsert(resume_id, companyIdArray, callback);
        }
    });
};

////school local functions
var resumeSchoolInsert = function(resume_id, schoolIdArray, callback){
    var query = 'INSERT INTO resume_school (resume_id, school_id) VALUES ?';
    var resumeSchoolData = [];
    if (schoolIdArray.constructor === Array) {
        for (var i = 0; i < schoolIdArray.length; i++) {
            resumeSchoolData.push([resume_id, schoolIdArray[i]]);
        }
    }
    else {
        resumeSchoolData.push([resume_id, schoolIdArray]);
    }
    connection.query(query, [resumeSchoolData], function(err, result){
        callback(err, result);
    });
};
var resumeSchoolUpdate = function(resume_id, schoolIdArray, callback) {
    var query = 'CALL resume_school_delete(?)';
    connection.query(query, resume_id, function(err, result) {
        if(err || schoolIdArray === undefined) {
            callback(err, result);
        } else {
            resumeSchoolInsert(resume_id, schoolIdArray, callback);
        }
    });
};

////skill local functions
var resumeSkillInsert = function(resume_id, skillIdArray, callback){
    var query = 'INSERT INTO resume_skill (resume_id, skill_id) VALUES ?';
    var resumeSkillData = [];
    if (skillIdArray.constructor === Array) {
        for (var i = 0; i < skillIdArray.length; i++) {
            resumeSkillData.push([resume_id, skillIdArray[i]]);
        }
    }
    else {
        resumeSkillData.push([resume_id, skillIdArray]);
    }
    connection.query(query, [resumeSkillData], function(err, result){
        callback(err, result);
    });
};
var resumeSkillUpdate = function(resume_id, skillIdArray, callback) {
    var query = 'CALL resume_skill_delete(?)';
    connection.query(query, resume_id, function(err, result) {
        if(err || skillIdArray === undefined) {
            callback(err, result);
        } else {
            resumeSkillInsert(resume_id, skillIdArray, callback);
        }
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE resume SET resume_name = ? WHERE resume_id = ?';
    var queryData = [params.resume_name, params.resume_id];

    connection.query(query, queryData, function(err, result) {
        resumeCompanyUpdate(params.resume_id, params.company_id, function(err, result){
            resumeSchoolUpdate(params.resume_id, params.school_id, function(err, result){
                resumeSkillUpdate(params.resume_id, params.skill_id, function(err, result){
                    callback(err, result);
                });
            });
        });
    });
};

exports.delete = function (params, callback) {
    getinfo(params.resume_id, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            var resume_name = result;
            var query = "DELETE FROM resume WHERE resume_id = ?";
            var queryData = [params.resume_id];

            connection.query(query, queryData, function(err, result){
                callback(err, resume_name);
            });
        }
    });

};
