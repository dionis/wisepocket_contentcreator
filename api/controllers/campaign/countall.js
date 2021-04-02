module.exports = {


  friendlyName: 'Countall',


  description: 'Countall campaign.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    allReviews = await Campaign.count({})
    //await this.res.json({reviews:allReviews})
    return this.res.send({
      'success': true,
      'message': 'Record Counted',
      //'files': images,
      'data': allReviews
    });
    //return exits.success({result: "!!!Sucessful"});
  

  }


};
