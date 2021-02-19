const TodoList = require('../models/todolists');
/*
注册后初始化内建列表
 */
function initList(userId) {
    const builtinLists = [{
        userId: userId,
        title: '我的一天',
        isCustomize: false,
        icon: 'myday'
    }, {
        userId: userId,
        title: '重要',
        isCustomize: false,
        icon: 'important'
    }, {
        userId: userId,
        title: '已计划日程',
        isCustomize: false,
        icon: 'calender'
    }, {
        userId: userId,
        title: '任务',
        isCustomize: false,
        icon: 'tasks'
    }];
    builtinLists.forEach(async e => {
        // 防止重名
        const todolistSameName = await TodoList.find({
            title: e.title,
        });

        if (todolistSameName.length === 0) {
            await new TodoList(e).save();
        }
    })
}

module.exports = initList;
