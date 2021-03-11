const supertest = require('supertest');

describe('CampingController', function() {
    describe('#create', function() {
        it('shuld create a Campaign', (done)=>{
            supertest(sails.hooks.http.app)
            .post('/camping/addCamping')
            .query()
            .send({
                titulo: 'TEste',
                descripcion: 'This is a Test',
                contanctoTelefono: '53684125',
                colorPrincipal: '255',
                colorSecundario: '0',
                contactoEmail: 'test@test.com',
                direccionPostal: 'J street #212, Suenno',
                contactoTelegram: '@test',
                contactoWhatsapp: '@53685125',
                contactoFacebook: 'test.facebook.com',
                createdby: null
            })
        });
    });
    describe('#getCampings', function() {
      it('should displays Campings', function (done) {
        req = {
            page: 0,
            limit: 2
        }
        supertest(sails.hooks.http.app)
        .get('/camping/campingslist')
        .query({
            page: 0,
            limit:0
        })
        .expect(200, function(err,res){
            if(err) return done(err);
            done();
        });
      });
    });
});