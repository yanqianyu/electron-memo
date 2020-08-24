// 模拟ajax请求的接口，生成并返回模拟数据
import {todos} from "./todolist"
var crypto = require('crypto');
const hash = crypto.createHash('sha256');
const Mock  = require('mockjs')

function getTodoList() {
    return todos
}

function editTodo(params) {
    const paramsObj = JSON.parse(params.body);
    const index = todos.findIndex(item => item.id === paramsObj.id);
    todos.splice(index, 1, {
        paramsObj
    })
    return paramsObj;
}

function addTodo(params) {
    const paramsObj = JSON.parse(params.body);
    // 根据时间计算id
    var time = new Date().getTime().toString();
    hash.update(time);
    var id = hash.digest('hex');
    paramsObj["id"] = id;
    todos.push(paramsObj);
    return paramsObj;
}

function deleteTodo(params) {
    const id = JSON.parse(params.body)["id"];
    let index = todos.findIndex(item => item.id === id);
    todos.splice(index, 1);
    return {id: id};
}

Mock.mock('/todo/list', 'get', getTodoList);
Mock.mock('/todo/edit', 'post', editTodo);
Mock.mock('/todo/add', 'post', addTodo);
Mock.mock('/todo/delete', 'post', deleteTodo);
