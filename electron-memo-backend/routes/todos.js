// todo模块路由

const jsonwebtoken = require('jsonwebtoken');
const jwt = require('koa-jwt');
const {secret} = require('../db.config');
const Router = require('koa-router');
const router = new Router({prefix: "/todos"});

const {findByUserId, findByUserIdAndListId, findByTodoId, create, checkOwner, delete: del, update, upload} = require('../controllers/todos');

const auth = jwt({secret});

router.get("/:userId", findByUserId); // 根据用户id返回所有todo

router.get("/todosByList/:userId/:listId", findByUserIdAndListId);

router.post("/:userId", auth, create); // 创建todo

router.post("/:userId/:todoId/upload", upload); // 上传文件

router.get("/todoById/:userId/:todoId", findByTodoId);

router.patch("/:userId/:todoId", auth, checkOwner, update); // 更新todo，需要jwt认证和验证操作用户身份

router.delete("/:userId/:todoId", auth, checkOwner, del); // 删除todo，需要jwt认证和验证操作用户身份

module.exports = router;
