module.exports = {


  friendlyName: 'Edit Campaign Action',


  description: 'Edit campaign.',


  inputs: {
    campaign: {
      type: 'ref',
      description: 'A Campaign Object'
    }
  },

  exits: {

  },


  fn: async function (inputs) {
    if(!inputs.campaign){return this.res.status(400).send({'error':'No Id Found in Request'})}
         sails.log.debug(req.body);
         updatedCampaign = inputs.campaign;
         await Campaign.update({id: updatedCampaign.id},updatedCampaign).fetch()
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
