module.exports = {


  friendlyName: 'File download',


  description: 'To download a file',


  inputs: {
    req: {
      type: 'ref',
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
    var blobAdapter = require('skipper-gridfs')({
        uri: 'mongodb://localhost:27017/netBD'
    });

    var fd = inputs.req.param('fd'); // value of fd comes here from get request
    sails.log.debug(fd);
    blobAdapter.read(fd, function(error , file) {
        if(error) {
          sails.log.debug(error);
            throw 'download_err';
        } else {
          sails.log.debug(file);
          return exits.success(file);
        }
    });

  }


};

