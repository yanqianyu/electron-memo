const {addTodo, fetchTodo} = require('../controller/todo');

const router = require('koa-router')();

router.post('/addtodo', addTodo);

module.exports = router;
