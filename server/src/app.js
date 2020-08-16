// node 后段服务器
const express = require('express');
const app = express();
const bodyparser = require('body-parser');

const todoAPI = require('./todoApi');

// 中间件
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.text());
app.use(bodyparser.json({ type: 'application/json'}));

// 后段API路由
app.use('/todo', todoAPI);

app.listen(3000);
console.log('success listen at port:3000....');

module.exports = app; // for testing
