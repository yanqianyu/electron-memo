var express = require('express');
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
    // 前端给的参数没有id，需要数据库自增
    conn.query(sql, [params.content, params.isDone], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
})

module.exports = router;
