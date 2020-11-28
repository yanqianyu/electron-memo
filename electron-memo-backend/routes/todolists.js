// todo列表模块路由

const Router = require('koa-router');
const router = new Router({prefix: "/todolist"});

const {find, findById, create, checkOwner, delete: del, update} = require('../controllers/todolists');

const auth = jwt({secret});

router.get("/:userId", find); // 获取某用户对应的所有list

router.post("/", auth, create); //新建list

router.get("/", findById); // 获取特定列表

router.patch("/:userId/:listId", auth, checkOwner, update); // 更新列表，需要jwt认证和验证操作用户身份

router.delete("/:userId/:listId", auth, checkOwner, del); // 删除用户，需要jwt认证和验证操作用户身份

module.exports = router;
