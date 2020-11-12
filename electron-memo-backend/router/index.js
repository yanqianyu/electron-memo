const {addTodo, fetchTodo, updateTodo, deleteTodo} = require('../controller/todo');

const router = require('koa-router')();

router.post('/addtodo', addTodo);
router.post('/fetchTodo', fetchTodo);
router.post('/uodateTodo', updateTodo);
router.post('/deletetodo', deleteTodo);

module.exports = router;
