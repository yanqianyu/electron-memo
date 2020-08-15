// SQL语句映射文件
var sqlMap = {
    todo: {
        add: 'insert into todo(content, isDone) values(?, ?)',
        update: 'update todo set content = ?, isDone = ? where id = ?',
        delete: 'delete * from todo where id = ?',
        query: 'select * from todo'
    }
}

module.exports = sqlMap;
