module.exports = {


  friendlyName: 'Delete file',


  description: '',


  inputs: {
    path: {
      type: 'string',
      description: 'The path of file'
    }
  },


  exits: {

    errorWhileUnliking: {
      description: 'Error while unlinking a file'
    },

    pathRequired: {
      description: 'Path Required'
    },

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    // TODO
      path = inputs.path;
      sails.log.debug(path);
      if(!path) return exits.pathRequired();
      const fs = require('fs');
      await fs.unlink(path, function(err) {
      if (err) return exits.errorWhileUnliking(err); // handle error as you wish
      return exits.success({'message': 'Image Deleted'});
      });    
  }


};

