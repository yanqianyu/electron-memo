# electron-memo
A tiny memo based on Electron8 and Vue

使用vue + electron + nodejs写的便签应用


## 需求分析
- [x] 查询所有的待办事项
- [x] 新增待办事项
- [ ] 修改已有待办事项
- [ ] 删除已有待办事项
- [ ] 未完成的待办事项的计数

## 每一条待办事项的数据结构
```
{
    id: Number,
    content: String, // 文字内容
    isDone: Boolean // 是否已经完成
}
```

## API
1.登录
```
api: /todo/login POST
```
2.获取待办事项列表
```
api: /todo/list GET
params: {}
return : [
    {
        id: Number,
        content: String,
        isDone: Boolean,
    }, 
    ...
]
```
3.新增待办事项
```
api: /todo/add POST
params: {
    content: String,
    isDone: Boolean
}
return: {
    id: Number,
    content: String,
    isDone: Boolean,
}
```
4.修改待办事项
```
api: /todo/edit POST
params: {
    id: Number,
    content: String,
    isDone: Boolean,
}
return: {
    id: Number,
    content: String,
    isDone: Boolean,
}
```
5.删除待办事项
```
api: /todo/delete POST
params: {
    id: Number
}
return: {
    id: Number
}
```

## 文件结构
```
|-- ELECTRON-MEMO
    |-- README.md
    |-- babel.config.js
    |-- package-lock.json
    |-- package.json
    |-- dist_electron
    |   |-- index.js
    |   |-- package.json
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |-- src
        |-- App.vue
        |-- background.js
        |-- main.js
        |-- apis
        |   |-- api.js
        |-- assets
        |   |-- logo.png
        |-- components
        |   |-- Note.vue
        |   |-- filter.vue
        |   |-- item.vue
        |   |-- layout.vue
        |-- router
        |   |-- index.js
        |-- store
            |-- index.js
```

## 测试
- Mock
- Mocha

## keynote
- [ ] 组件之间的CSS的权重
- [ ] 组件情况下的flex布局
- [ ] electron如何控制/固定页面大小
- [ ] background.js -> main process

## asserts
freeicons.io
manypixels.co

##
todo数据设计
```
{
    "id": "", // 每一条todo都有独特的id标记
    "title": "", // todo的内容/标题
    "isDone": false, // todo是否已经完成
    "isImportant": false, // todo是否重要
    "checklists": [], // 所属的list的id
    "steps": [{
        "id": "", // step id
        "content": "",
        "isDone": false
    }],
    "times": {
        "reminder": "", // 提醒我
        "ddl": "", // 截止时间
        "repeat": "" // 重复
    },
    "files": [{
        "id": "",
        "content": "s"
    }],
    "createTime": "", // 创建todo的时间
    "notes": "", // 备注
}
```

自定义清单/列表 list
```json
{
  "id": "", 
  "name": "",
  "icon": "",
  "url": ""
}
```
