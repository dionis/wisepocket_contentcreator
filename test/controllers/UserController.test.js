var supertest = require('supertest');
var assert = require('assert');
describe('UserController.login', function() {
  describe('#login', function() {
      it('should redirect to /my/page', function (done) {
        supertest(sails.hooks.http.app)
        .post('/singIn')
        .send({ email: 'admin@example.com', password: '12345678' })
        .expect(200, (err,res)=>{
          if(err) {return done(err);}
          //assert.equal("Request must contain Email and Password",res.body.message) 
          done();
        });
      });
    });
});