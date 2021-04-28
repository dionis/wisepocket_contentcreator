var  convert = require('xml-js');
//var json = require('fs').readFileSync('test.json', 'utf8');
module.exports = {



  friendlyName: 'Generate xml',


  description: '',


  inputs: {
    camapingname: {
        type: 'string',
        example: 'covid-19',
        description: 'The name of campaing.',
        required: true,
        //defaultsTo: 'covid-19'
      }
  },


  exits: {

    success: {
      outputFriendlyName: 'Recent users',
      outputDescription: 'An array of users who recently logged in.',
    },

    noUsersFound: {
      description: 'Could not find any users who logged in during the specified time frame.'
    }

  },


  fn: async function (inputs,exits) {
    //Bibliografy:
    //https://www.npmjs.com/package/xml-js

    //// ***********************  OOOOJJOOOO SEE ALL PARAMETERS ************///////
    var options = {compact: true, ignoreComment: true, spaces: 4};
   // var result = convert.json2xml(json, options);


     var result = `Hello, ${inputs.camapingname}!`;
     console.log(result);
     return exits.success(result);
  }


};

