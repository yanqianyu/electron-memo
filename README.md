# electron-memo
A tiny memo based on Electron8 and Vue

使用vue + electron + nodejs写的便签应用


## 需求分析
[ ] 查询所有的待办事项
[ ] 新增待办事项
[ ] 修改已有待办事项
[ ] 删除已有待办事项
[ ] 未完成的待办事项的计数

## 每一条待办事项的数据结构
```
{
    id: Number,
    content: String, // 文字内容
    isDone: Boolean, // 是否已经完成
    isDeleted: Boolean //是否已经删除
}
```

## API
1. 获取待办事项列表
```
api: /todo/list GET
params: {}
return : [
    {
        id: Number,
        content: String,
        isDone: Boolean,
        isDeleted: Boolean
    }, 
    ...
]
```

2. 新增待办事项
```
api: /todo/add POST
params: {
    title: String,
    text: String
}
return: {
    id: Number,
    content: String,
    isDone: Boolean,
    isDeleted: Boolean
}
```
3. 修改待办事项（包括删除，完成状态的改变）
```
api: /todo/edit POST
params: {
    id: Number,
    content: String,
    isDone: Boolean,
    isDeleted: Boolean
}
data: {
    id: Number,
    content: String,
    isDone: Boolean,
    isDeleted: Boolean
}
```

## 文件结构
├── mock // 测试
├── components
    item.vue -- 单项待办事项