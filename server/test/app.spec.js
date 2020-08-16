let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../src/app');

let should = chai.should();

chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe('App', () => {
    // eslint-disable-next-line no-undef
    it ('should list todos', function (done) {
        chai.request(app)
            .get('/todo/list')
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.least(0);
                done();
            });
    });
    // eslint-disable-next-line no-undef
    it ('should record a todo', function (done) {
        chai.request(app)
            .post('/todo/add')
            .send({
                content: 'test demo',
                isDone: false
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.have.property('id').eql('待办事项添加成功');
                res.body.should.have.property('content');
                res.body.should.have.property('isDone');
                done();
            })
    });
    // eslint-disable-next-line no-undef
    it ('delete a todo', function (done) {
        chai.request(app)
            .post('/todo/delete')
            .send({
                id: 1
            })
            .end((err, res) => {
                res.should.have.status(200);
                should.not.exist(err);
                res.body.should.have.property('id').eql('待办事项删除成功');
                done();
            })
    });

    // eslint-disable-next-line no-undef
    it ('edit a todo', function (done) {
        chai.request(app)
            .post('/todo/update')
            .send({
                id: 1,
                content: 'new todo',
                isDone: true
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.body.should.have.property('id');
                res.body.should.have.property('content');
                res.body.should.have.property('isDone');
                done();
            })
    });
});
