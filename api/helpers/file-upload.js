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

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs,exits) {
    if(inputs.req.file)
      inputs.req.file('campIcon').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images')
      }, function (err, filesUploaded) {
        if (err) throw 'upload_err';
        //sails.log.debug(filesUploaded.length)
        if(filesUploaded.length === 0) throw 'noReqImages';
        return exits.success(filesUploaded);
      });
    //return exits.success('hello');
  },
  


};

