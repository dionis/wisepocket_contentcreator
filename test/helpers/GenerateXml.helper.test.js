const supertest = require('supertest');
const assert = require('assert');
const salis = require('sails');;
const fs = require('fs');
var path = require('path');
const util = require('util');
const xml2js = require('xml2js');
const faker = require('faker');
var appRoot = require('app-root-path');
var  convert = require('xml-js');
const pathToFile = 'test'+ path.sep + 'fixtures'+ path.sep



describe('GenerateCamaignXML', function() {
    describe('#create', function() {
        it('Should create a XML Campaing', (done)=>{
              done();
        })
        // it('Should create a XML Campaing',async (done)=>{
        //       //Bibliografy:
        //        //https://www.npmjs.com/package/xml-js

        //     //// ***********************  OOOOJJOOOO SEE ALL PARAMETERS ************///////
        //          let campaingName = "covid-19";
        //         //1- Call promise to sails.helper.generate-xml to camapaing wih name
        //         //"covid-19"
        //         let campaingXML =  await sails.helpers.generateXml.with({ campaingname: campaingName });

        //         console.log("Result of call Generate XML helper " + campaingXML); });

        //         //2- Read JSON in FileSystem testCampaingXml2Json.js
        //          var testCampaingXml2Json = fs.readFileSync( pathToFile + 'testCampaing.json', 'utf8');

        //         //3- generateXmlInJson = Convert XML returner by generateXml helper to JSON
        //            var options = {compact: true, ignoreComment: true, spaces: 4};
        //            var generateXmlInJson = convert.xml2json(xmlFromHelper, options);

        //         //4- testCampaingXml2Json === generateXmlInJson
        //              assert.equal( testCampaingXml2Json, generateXmlInJson);
        //         //5- SUSCESSFUL !!!!!



        //         ///The test should create a XML and it must by equal to JSON
        //         //var json = require('fs').readFileSync( pathToFile + 'testCampaing.json', 'utf8');
        //         console.log(result);
        //         done();

        // });
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
