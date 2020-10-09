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

let todos = [
    {
        id: 0,
        title: "test todo 1",
        isDone: false,
        isImportant: false,
        checklists: ["myday"],
        steps: [],
        times: {
            reminder: '',
            ddl: '',
            repeat: ''
        },
        files: [],
        createTime: '',
        notes: null
    },
    {
        id: 0,
        title: "test todo 1",
        isDone: false,
        isImportant: false,
        checklists: [2],
        steps: [],
        times: {
            reminder: '',
            ddl: '',
            repeat: ''
        },
        files: [],
        createTime: '',
        notes: null
    },
    {
        id: 0,
        title: "test todo 1",
        isDone: false,
        isImportant: false,
        checklists: [3],
        steps: [],
        times: {
            reminder: '',
            ddl: '',
            repeat: ''
        },
        files: [],
        createTime: '2020-9-21 14:58:43',
        notes: null
    }
]
export {
    builtins, todos
}
