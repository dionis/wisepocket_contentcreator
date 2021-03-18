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
      description: 'Error while train to upload images'
    },
    noReqImages: {
      description: 'No images founds'
    },
    noImageCreated: {
      description: 'No images created'
    },

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs,exits) {
    if(inputs.req.file)
      inputs.req.file('file').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images')
      }, async function (err, filesUploaded) {
        if (err) throw 'upload_err';
        //sails.log.debug(filesUploaded.length)
        if(filesUploaded.length === 0) throw 'noReqImages';
        const images = [];
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
                throw 'noImageCreated'
              })
              //sails.log.debug(imagen);
          }      
      }
      return exits.success(images);
    });
    //return exits.success('hello');
  },
  


};

