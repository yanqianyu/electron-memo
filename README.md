# electron-memo
A tiny memo based on Electron8 and Vue

使用vue + electron + nodejs写的便签应用


## 需求分析
- [ ] 查询所有的待办事项
- [ ] 新增待办事项
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
1. 获取待办事项列表
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

2. 新增待办事项
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
3. 修改待办事项
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
4. 删除待办事项
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

## todo
- [ ] Mock: 404
