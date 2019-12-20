// Connect to test database
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const app = require('../app');
const User = require('../models/userM');

chai.use(chaiHttp);

describe('Book a hero', () => {
  describe('Clear Users', () => {
    User.collection.drop();
  });

  describe('/GET heroes', () => {
    it('it should give back an 401 error code since no user is logged in', (done) => {
      chai.request(app)
        .get('/api/heroes')
        .end((err, res) => {
          console.log(res);
          res.should.have.status(401);

          done();
        });
    });
  });
  describe('/POST create User', () => {
    it('it should send the data which provided to the server and a new user should be created', (done) => {
      chai.request(app)
        .post('/api/users/create')
        .set('content-type', 'application/json')
        .send({ username: 'testuser', password: 'TestPW', email: 'test@gmx.de' })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('/GET heroes', () => {
    it('it should give back an array with one hero in it', (done) => {
      chai.request(app)
        .get('/api/heroes')
        .set('Cookie', 'user_sid=s%3A6YspAC2a9qaBivypAibxxVbPCgG_LI79.QkYhZEX%2BevhPrd4c6JKylTy3jMkJI7PlOBbkQ42iagA')
        .end((err, res) => {
          console.log(res);
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });
  describe('/POST book a hero', () => {
    it('it should creates a reference in the userprofile to the booked hero', (done) => {
      chai.request(app)
        .post('/api/users/bookHero/5dfce7cdcac4e2085c55a0ad')
        .set('Cookie', 'user_sid=s%3A6YspAC2a9qaBivypAibxxVbPCgG_LI79.QkYhZEX%2BevhPrd4c6JKylTy3jMkJI7PlOBbkQ42iagA')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Hero 5dfce7cdcac4e2085c55a0ad was booked successfully');
          done();
        });
    });
  });
});
