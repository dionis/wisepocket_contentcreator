module.exports = {


  friendlyName: 'Update',


  description: 'Update marker.',


  inputs: {
    markerId: {
      type: 'string',
      description: 'A Marker Id'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    data = this.req.body;
    if(!inputs.markerId){return this.res.status(400).send({'error':'No Id Found in Request'})}
         //sails.log.debug(req.body);
      if(!data) return this.res.status(400).send({'error': 'Data in body Request Not Found'});
      updatedId = inputs.markerId;
      await Marker.update({id: updatedId},data).fetch()
      .then(marker=>{
          return this.res.send({
            'success': true,
              'message': 'Record Edited',
              'data': marker
          })
      })
      .catch(err=>{
          return this.res.status(500).send({
            'error': err
          });
      })
  }


};
