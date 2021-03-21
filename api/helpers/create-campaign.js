module.exports = {


  friendlyName: 'Create Campaign',


  description: 'To create a new Campagin',


  inputs: {
    campaigns: {
      type: 'ref',
      descripcion: 'Object that contains key-value pairs of Campaign properties'
    },
  },


  exits: {
    success: {
      responseType: 'json',
      description: 'Record Created'
    },

    someError: {
      description: 'Some Error Hapends'
    },

    notUniqueError: {
      description: 'Field Unique Contrains Violation'
    }
  },


  fn: async function (inputs,exits) {
    
    //if(!this.req.header('Authorization')){ return exits.someError({'message': 'No Token Foud!'});}
         //const token = this.req.header('Authorization').split('Bearer ')[1];
         //sails.log.debug(token);
         //const payload = await jwt.decode(token);
        //  await jwt.verify(token,'hjghdvdfjvnishvishr4oo', async (err,payload)=>{
        //      if(err) return exits.someError({'message': err});
        //      if(!payload) return exits.someError({'message': 'Not Match Token Payload'})
        //     await User.findOne({id:payload._id}, async (err, user)=> {
        //         if (err) { 
        //             //ails.log.debug('No match User');
        //             return exits.someError({
        //                 'error': err
        //             });
        //         }
    //if(!inputs.user) return exits.someError({'error': 'User Not Found'});
    // let images;
    // if(this.req){
    //   images = await sails.helpers.fileUpload(this.req)                
    //   .tolerate('upload_err', (err)=>{
    //       return exits.someError({
    //           'message': 'Error while uploading files',
    //           'error': err
    //       });
    //   })
    //   .tolerate('noImageCreated', (err)=>{
    //       return exits.someError({
    //           'message': 'Error while saving Image objects',
    //           'error': err
    //       });
    //   })
    // }
    sails.log.debug(inputs.campaigns);
    await Campaign.createEach(
      //   {
      //     titulo: inputs.titulo,
      //     descripcion: inputs.descripcion,
      //     contanctoTelefono: inputs.contanctoTelefono,
      //     colorPrincipal: inputs.colorPrincipal,
      //     colorSecundario: inputs.colorSecundario,
      //     contactoEmail: inputs.contactoEmail,
      //     direccionPostal: inputs.direccionPostal,
      //     contactoTelegram: inputs.contactoTelegram,
      //     contactoWhatsapp: inputs.contactoWhatsapp,
      //     contactoFacebook: inputs.contactoFacebook,
      //     createdby: user.id,
      //     logo: images[0]?images[0].id:null,
      //     carrusel1: images[1]?images[1].id:null,
      //     carrusel2: images[2]?images[2].id:null,
      //     carrusel3: images[3]?images[3].id:null,
      //     carrusel4: images[4]?images[4].id:null
      // }
    inputs.campaigns).fetch()
    .then(async (campaign)=>{
        //sails.log.debug('entra bien');
        // if(images){
        //   campaign = await campaign.update().set({
        //     logo: images[0]?images[0].id:null,
        //     carrusel1: images[1]?images[1].id:null,
        //     carrusel2: images[2]?images[2].id:null,
        //     carrusel3: images[3]?images[3].id:null,
        //     carrusel4: images[4]?images[4].id:null
        //   }).fetch();
        // }
        return exits.success({
            'success': true,
            'message': 'Record Created',
            //'files': images,
            'data': campaign 
        });
    })
    // .intercept('E_UNIQUE', ()=>{ 
    //   return exits.notUniqueError(
    //     {'error':'There is already an account using that email address!'}
    //     ) 
    // })
    .catch(err=>{
        sails.log.debug(err);
        return exits.someError(err); 
    })
        //     });
        //  });

  }

};

