module.exports = {


  friendlyName: 'Get campaign',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    if(!this.req.param('_id')){
      return this.res.status(400).send({
          'error': 'ID no encontrado en el Request'
      })
    }
    campaignId = this.req.param('_id')
    await Campaign.findOne({id: campaignId})
    .then(campaign=>{
        if(!campaign){ 
          return this.res.status(400).send({
            'success': false,
            'message': 'No Campaign Found',
          });
        }
        return this.res.send({
          'success': true,
          'message': 'Record Fetched',
          //'files': images,
          'data': campaign
      });
    })

  }


};
