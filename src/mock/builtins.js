let builtins = [
    {
        id: 1,
        name: "我的一天",
        icon: require('../assets/icons/myday.svg'),
        url: "/builtinList/myday" // router 路由
    },
    {
        id: 2,
        name: "重要",
        icon: require('../assets/icons/important.svg'),
        url: "/builtinList/important"
    },
    {
        id: 3,
        name: "已计划日程",
        icon: require('../assets/icons/calender.svg'),
        url: "/builtinList/haveplanned"
    },
    {
        // 任务中的todo只有todo一个list 不存在于其他list
        id: 4,
        name: "任务",
        icon: require('../assets/icons/tasks.svg'),
        url: "/builtinList/task"
    }
];
export {
    builtins
}
