var express = require('express');
var crypto = require('crypto');
const hash = crypto.createHash('sha256');

var router = express.Router();
var mysql = require('mysql');
var model = require('./db');
var $sql = require('./sqlMap');

// 连接数据库
var conn = mysql.createConnection(model.mysql);
conn.connect();

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

router.post('/add', (req, res) => {
    var sql = $sql.todo.add;
    var params = req.body;
    console.log(params);
    // 前端给的参数没有id
    // 根据当前时间计算id
    var time = new Date().getTime().toString();
    hash.update(time);
    var id = hash.digest('hex');
    conn.query(sql, [id, params.content, params.isDone], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, {
                id: id,
                content: params.content,
                isDone: params.isDone
            });
        }
    })
})

router.get('/list', (req, res) => {
    var sql = $sql.todo.query;
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
})

router.post('/edit', (req, res) => {
    var sql = $sql.todo.update;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.id, params.content, params.isDone], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, params);
        }
    })
})

router.post('/delete', (req, res) => {
    var sql = $sql.todo.delete;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, params);
        }
    })
})

module.exports = router;
