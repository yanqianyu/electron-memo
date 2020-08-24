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
                res.body.should.have.property('id');
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
                id: 'c3cb806aec76948de8635fb88e96a1bbef76fdd3e909c2dbc145e99104036a1c'
            })
            .end((err, res) => {
                res.should.have.status(200);
                should.not.exist(err);
                res.body.should.have.property('id');
                done();
            })
    });

    // eslint-disable-next-line no-undef
    it ('edit a todo', function (done) {
        chai.request(app)
            .post('/todo/update')
            .send({
                id: 'd2e1d8d68ed1be04f3cff3a1ad680ac913ea7ff103d167a7740e7f9685fe5b02',
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
