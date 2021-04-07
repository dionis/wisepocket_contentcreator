module.exports = {


  friendlyName: 'Asociate images',


  description: '',


  inputs: {
    id: {
      type: 'string',
      required: true,
      despcription: 'Information Id'
    },

    images: {
      type: 'ref',
      required: true,
      despcription: 'Images of Information'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
