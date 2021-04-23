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
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    //Bibliografy:
    //https://www.npmjs.com/package/xml-js

    //// ***********************  OOOOJJOOOO SEE ALL PARAMETERS ************///////
    var options = {compact: true, ignoreComment: true, spaces: 4};
   // var result = convert.json2xml(json, options);
    console.log(result);

     var result = `Hello, ${inputs.camapingname}!`;
     return exits.success(result);
  }


};

