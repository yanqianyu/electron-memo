// 模拟ajax请求的接口，生成并返回模拟数据

import Mock from 'mockjs'
import {todos} from "./todolist"

function getTodoList() {
    return todos
}

function editTodo(params) {
    const paramsObj = JSON.stringify(params);
    const index = todos.findIndex(item => item.id === paramsObj.id);
    todos.splice(index, 1, {
        paramsObj
    })
    return paramsObj;
}

function addTodo(params) {
    const paramsObj = JSON.stringify(params);
    paramsObj["id"] = todos.length + 1;
    todos.push(paramsObj);
    return paramsObj;
}

function deleteTodo(params) {
    const id = JSON.stringify(params)["id"];
    let index = todos.findIndex(item => item.id === id);
    todos.splice(index, 1);
    return {id: id};
}

Mock.mock('/todo/list', 'GET', getTodoList);
Mock.mock('/todo/edit', 'POST', editTodo);
Mock.mock('/todo/add', 'POST', addTodo);
Mock.mock('/todo/delete', 'POST', deleteTodo);
