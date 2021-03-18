module.exports = {


  friendlyName: 'Create object',


  description: 'To create a new Object',


  inputs: {

    object: {
      type: 'ref',
      description: 'The current object to create',
      required: true
    },

    /*body: {
      type: 'ref',
      description: 'The body that contain a objects keys-values',
      required: true
    }*/

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    if(inputs.object){
      sails.log.debug(inputs.object)
      await inputs.object
              .then(() =>{
                return exits.success({
                  'success': true,
                  'message': 'Record Created',
                  'data': inputs.object 
                });
              })
              .catch(err=>{
                return exits.success({
                  'success': false,
                  'message': 'Record No Created',
                  'error': err 
                });
              })
    }
  }


};

