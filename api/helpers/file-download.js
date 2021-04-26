module.exports = {


  friendlyName: 'File download',


  description: 'To download a file',


  inputs: {
    path: {
      type: 'string',
      description: 'The current incoming request (req).',
      required: true
    },
  },


  exits: {
    download_err: {
      description: 'Error while train to download images'
    },
    noReqImages: {
      description: 'No images founds'
    },

    success: {
      description: 'All done.',
    },

  },


  fn: function (inputs,exits) {
    // var blobAdapter = require('skipper-gridfs')({
    //     uri: 'mongodb://localhost:27017/netBD'
    // });
    const fs = require('fs');
    var fd = inputs.path; // value of fd comes here from get request
    sails.log.debug(fd);
    arrayString = fd.split("'\\'")// Arreglar
    sails.log.debug(arrayString);
    fs.readFile(fd, {encoding: 'base64'}, function(error , file) {
        if(error) {
          sails.log.debug(error);
          exits.download_err(error);
        } else {
          //sails.log.debug(file);
          return exits.success(file);
        }
    });

  }


};

