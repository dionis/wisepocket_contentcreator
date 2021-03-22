const { exists } = require('grunt');

module.exports = {


  friendlyName: 'File upload',


  description: 'Tu get files from the req.',


  inputs: {
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    },
  },


  exits: {
    upload_err: {
      description: 'Error while train to upload images',
      status: 500
    },
    noImageCreated: {
      description: 'No images created',
      status: 500
    },

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs,exits) {
    if(inputs.req.file)
      inputs.req.file('files').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
      }, async function (err, filesUploaded) {
        if (err) {
          sails.log.debug(err)
          return exits.upload_err(err);
        }
        let images = [];
        if(filesUploaded.length > 0){
          for (let index = 0; index < filesUploaded.length; index++) {
            sails.log.debug(filesUploaded[index].type)
            if(filesUploaded[index].type === 'image/jpeg' 
            || filesUploaded[index].type === 'image/png' 
            || filesUploaded[index].type === 'image/jpg'){
                images.push({
                  titulo: filesUploaded[index].filename,
                  path: filesUploaded[index].fd,
                });
            }
          }
          await Imagen.createEach(images).fetch()
            .then(imgs=>{
              return exits.success(imgs);
            }) 
            .catch(err=>{
              return exits.noImageCreated(err);
            })
        }
        return exits.success(images);
    });
    //return exits.success('hello');
  },
  


};

