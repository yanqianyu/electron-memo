// todo列表模块路由
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('koa-jwt');
const {secret} = require('../config');
const Router = require('koa-router');
const router = new Router({prefix: "/todolist"});

const {findByUserId, findByListId, create, checkOwner, delete: del, update} = require('../controllers/todolists');

const auth = jwt({secret});

router.get("/:userId", findByUserId); // 获取某用户对应的所有list

router.post("/", auth, create); //新建list

router.get("/:userId/:listId", findByListId); // 获取特定列表

router.patch("/:userId/:listId", auth, checkOwner, update); // 更新列表，需要jwt认证和验证操作用户身份

router.delete("/:userId/:listId", auth, checkOwner, del); // 删除用户，需要jwt认证和验证操作用户身份

module.exports = router;
