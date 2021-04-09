module.exports = {


  friendlyName: 'Delete',


  description: 'Delete campaign.',


  inputs: {
    campaignId: {
      type: 'string',
      description: 'A Campaign Id'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    if(!inputs.campaignId){return this.res.status(400).send({'error':'No Id Found in Request'})}
        // sails.log.debug(req.body);
         updatedId = inputs.campaignId;
         await Campaign.destroy({id: updatedId},data).fetch()
         .then(campaign=>{
             return this.res.send({
                'success': true,
                 'message': 'Record Edited',
                 'data': campaign
             })
         })
         .catch(err=>{
             return this.res.status(500).send({
               'error': err
             });
         })

  }


};