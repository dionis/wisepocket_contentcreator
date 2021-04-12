
const path = require('path') 
const fs = require('fs')
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
    //sails.log.debug(inputs.req.file('files'))
    if(!inputs.req.file) return exits.upload_err(err)
    var newPath = 'assets/' 
    inputs.req.file('files').upload({
      maxBytes: 1024000000,
      dirname: path.resolve(sails.config.appPath, newPath),
    }, async function (err, filesUploaded) {
        if (err) {
          sails.log.debug(err)
          return exits.upload_err(err);
        }
        let files = [];
        if(filesUploaded.length > 0){
          for (let index = 0; index < filesUploaded.length; index++) {
            //sails.log.debug(filesUploaded[index].type)
            if(filesUploaded[index].type === 'image/jpeg' 
            || filesUploaded[index].type === 'image/png' 
            || filesUploaded[index].type === 'image/jpg'){
              newPath = "assets/images/"+filesUploaded[index].filename;
              fs.rename(
                filesUploaded[index].fd, 
                newPath, function(err){
                  if(err)sails.log.debug(err)})
              files.push({
                  titulo: filesUploaded[index].filename,
                  path: newPath,
                });
            }else{
              if(filesUploaded[index].type === 'video/mp4' 
              || filesUploaded[index].type === 'video/mpg' 
              || filesUploaded[index].type === 'video/avi'){
                newPath = "assets/videos/"+filesUploaded[index].filename;
                fs.rename(
                filesUploaded[index].fd, 
                newPath, function(err){
                });
                files.push({
                  titulo: filesUploaded[index].filename,
                  path: newPath,
                });
              } 
            }
          }
        }
        return exits.success(files);
      });
    //return exits.success('hello');
  },
  


};

