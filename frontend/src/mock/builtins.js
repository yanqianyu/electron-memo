let builtins = [
	{
		id: "1",
		name: "我的一天",
		icon: require("../assets/icons/myday.svg"),
		url: "/builtinList?listid=1" // router 路由
	},
	{
		id: "2",
		name: "重要",
		icon: require("../assets/icons/important.svg"),
		url: "/builtinList?listid=2"
	},
	{
		id: "3",
		name: "已计划日程",
		icon: require("../assets/icons/calender.svg"),
		url: "/builtinList?listid=3"
	},
	{
		// 任务中的todo只有todo一个list 不存在于其他list
		id: "4",
		name: "任务",
		icon: require("../assets/icons/tasks.svg"),
		url: "/builtinList/?listid=4"
	}
];

// 一个todo可以同时属于多个内建list和一个自建list
let todos = [
	{
		id: 1,
		title: "test todo 1",
		isDone: false,
		builtinList: ["1"], // 记录所属的内建list
		customList: [], // 记录所属的自建list，至多一个
		steps: [],
		times: {
			reminder: null,
			ddl: null,
			repeat: null
		},
		files: [],
		createTime: null,
		notes: null
	},
	{
		id: 2,
		title: "test todo 2",
		isDone: false,
		builtinList: ["1"],
		customList: [],
		steps: [],
		times: {
			reminder: null,
			ddl: null,
			repeat: null
		},
		files: [],
		createTime: null,
		notes: null
	},
	{
		id: 3,
		title: "test todo 3",
		isDone: false,
		builtinList: ["2"],
		customList: [],
		steps: [],
		times: {
			reminder: null,
			ddl: null,
			repeat: null
		},
		files: [],
		createTime: null,
		notes: null
	},
	{
		id: 4,
		title: "test todo 4",
		isDone: false,
		builtinList: ["3"],
		customList: [],
		steps: [],
		times: {
			reminder: null,
			ddl: null,
			repeat: null
		},
		files: [],
		createTime: "2020-9-21 14:58:43",
		notes: null
	}
];
export {
	builtins, todos
};
