// 用户模块路由
// 用户的登陆以及增删改查

const jsonwebtoken = require('jsonwebtoken');
const jwt = require('koa-jwt');
const {secret} = require('../db.config');
const Router = require('koa-router');
const router = new Router({prefix: "/users"}); //路由前缀

const {find, findById, create, checkOwner, delete: del, login} = require('../controllers/users');

const auth = jwt({secret}); // jwt鉴权

router.get("/", find); // 获取用户列表

router.post("/register", create); // 创建用户

router.get("/:id", findById); // 获取特定用户

router.post("/login", login); // 用户登陆

module.exports = router;
