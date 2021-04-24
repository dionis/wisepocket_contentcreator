const supertest = require('supertest');
const assert = require('assert');
const salis = require('sails');;
const fs = require('fs');
var path = require('path');
const util = require('util');
const xml2js = require('xml2js');
const faker = require('faker');
var appRoot = require('app-root-path');
const pathToFile = 'test'+ path.sep + 'fixtures'+ path.sep

//Bibliografy:
//https://blog.logrocket.com/a-quick-and-complete-guide-to-mocha-testing-d0e0ea09f09d/
//https://mochajs.org/#global-teardown-fixtures

// before()  runs once before the first test case in the block
// beforeEach()  runs before each test case
// afterEach()  runs after each test case
// after()  runs once after the last test case in the block

// Depending on the hooks that apply to a given test suite, the hooks are run together with the tests in the suite in a definite sequence.

// before() -> beforeEach() -> test() -> afterEach() -> after()

describe('CampingController', function() {
  before(async function() {
    await  supertest(sails.hooks.http.app)
    .post('/singIn')
    .send({ email: 'admin@example.com', password: '12345678' })
  });

  after( async function() {
    await  supertest(sails.hooks.http.app)
    .post('/logout')
    .send()
  });
    describe('#create', function() {
        // it('shuld create a Campaign', (done)=>{
        //     console.log("Call execution ==> " + '/campaign/addCampaign')
        //     supertest(sails.hooks.http.app)
        //     .post('/campaign/addCampaign')
        //     .query()
        //     .send({
        //         titulo: 'TEste',
        //         descripcion: 'This is a Test',
        //         contanctoTelefono: '53684125',
        //         colorPrincipal: '255',
        //         colorSecundario: '0',
        //         contactoEmail: 'test@test.com',
        //         direccionPostal: 'J street #212, Suenno',
        //         contactoTelegram: '@test',
        //         contactoWhatsapp: '@53685125',
        //         contactoFacebook: 'test.facebook.com',
        //         createdby: null
        //     })
        //      .expect(200, function(err,res){
        //            console.log("<--- Execute test --->")
        //           if(err) return done(err);
        //           done();
        //     });
        // });

        it('shuld create a Campaign TEMPLATE ', (done)=>{
          done();
      });
    });

    // describe('#getCampings', function() {
    //   it('should displays Campings', function (done) {
    //     req = {
    //         page: 0,
    //         limit: 2
    //     }
    //     supertest(sails.hooks.http.app)
    //     .get('/camping/campingslist')
    //     .query({
    //         page: 0,
    //         limit:0
    //     })
    //     .expect(200, function(err,res){
    //         if(err) return done(err);
    //         done();
    //     });
    //   });
    // });

    // describe("#Upload images abaout campaing", function(){
    //   it('upload ZIP file trew opinions', function (done) {

    //     ///Get Campaing id
    //     Campaing.find({}).limit(1).then( function (campainInfo){

    //       var campaingdata = {
    //         campaingid: campainInfo[0].numcamp
    //       };

    //     console.log("Address " + appRoot + path.sep + pathToFile +  'enlineapp.zip')
    //     request(sails.hooks.http.app)
    //       .post('/review/upload-opinion')
    //       .field(campaingdata)
    //       .attach('uploadedfile', appRoot + path.sep + pathToFile + 'enlineapp.zip')
    //       .expect(200, function (err, res) {
    //         if (err)
    //           return done(err);

    //         console.log("########################################################################")
    //         ////Nota en este punto deberia devolver un xml con el identificador
    //         ////asociado a las opiniones si es un mismo tel
    //         assert.equal("OK", res.body.status);
    //         //console.log(res.body.files);
    //         request(sails.hooks.http.app)
    //             .get('/review/count-all-opinion')
    //             .query({
    //               page:0,
    //               len:20,
    //               campaingid:234,
    //               initialDate:'2020-02-23 20:34',
    //               finalDate:'2020-03-10 06:34'
    //             })
    //             .expect(200, function (err, res) {
    //                 if (err) return done(err);
    //                 console.log("======= Count all opinion =====")
    //                 console.log(JSON.stringify(res.body))
    //                 assert.equal("OK",res.body.mssg)
    //                 assert.equal(true,res.body.reviews > 0 )
    //                 done()
    //             });

    //         //done()
    //       })
    //     })
    //   });

    //   it('upload ZIP file Single opinion', function (done) {

    //     ///Get Campaing id
    //     Campaing.find({}).limit(1).then( function (campainInfo){

    //       var campaingdata = {
    //         campaingid: campainInfo[0].numcamp
    //       };

    //     console.log("Address " + appRoot + path.sep + pathToFile +  'singleOpinion.zip')
    //     request(sails.hooks.http.app)
    //       .post('/review/upload-opinion')
    //       .field(campaingdata)
    //       .attach('uploadedfile', appRoot + path.sep + pathToFile + 'singleOpinion.zip')
    //       .expect(200, function (err, res) {
    //         if (err)
    //           return done(err);

    //         console.log("########################################################################")
    //         ////Nota en este punto deberia devolver un xml con el identificador
    //         ////asociado a las opiniones si es un mismo tel
    //         assert.equal("OK", res.body.status);
    //         //console.log(res.body.files);
    //         request(sails.hooks.http.app)
    //             .get('/review/count-all-opinion')
    //             .query({
    //               page:0,
    //               len:20,
    //               campaingid:234,
    //               initialDate:'2020-02-23 20:34',
    //               finalDate:'2020-03-10 06:34'
    //             })
    //             .expect(200, function (err, res) {
    //                 if (err) return done(err);
    //                 console.log("======= Count all opinion =====")
    //                 console.log(JSON.stringify(res.body))
    //                 assert.equal("OK",res.body.mssg)
    //                 assert.equal(true,res.body.reviews > 0 )
    //                 done()
    //             });

    //         //done()
    //       })
    //     })
    //   });
    // })
    //})
});
