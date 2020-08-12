// SQL语句映射文件
var sqlMap = {
    todo: {
        add: 'insert into todo(content, isDone) values(?, ?)',
        update: '',
        delete: '',
        query: ''
    }
}

module.exports = sqlMap;
