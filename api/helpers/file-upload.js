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
    fileFieldName: {
      type: 'string',
      description: 'The Name of de Field of Filess',
      required: true
    }
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
    sails.log.debug(inputs.fileFieldName)
      inputs.req.file(inputs.fileFieldName).upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
      }, async function (err, filesUploaded) {
        if (err) {
          sails.log.debug(err)
          return exits.upload_err(err);
        }
        let images = [];
        if(filesUploaded.length !== 0){
          for (let index = 0; index < filesUploaded.length; index++) {
            sails.log.debug(filesUploaded[index].type)
            if(filesUploaded[index].type === 'image/jpeg' 
            || filesUploaded[index].type === 'image/png' 
            || filesUploaded[index].type === 'image/jpg'){
                await Imagen.create({
                    titulo: filesUploaded[index].filename,
                    path: filesUploaded[index].fd,
                  }).fetch()
                  .then(img=>{
                    images.push(img);
                  })
                .catch(err=>{
                  return exits.noImageCreated(err);
                })
                //sails.log.debug(imagen);
            }      
          }
        }
        return exits.success(images);
    });
    //return exits.success('hello');
  },
  


};

