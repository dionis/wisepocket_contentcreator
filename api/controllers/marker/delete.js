module.exports = {


  friendlyName: 'Delete',


  description: 'Delete marker.',


  inputs: {
    markerId: {
      type: 'string',
      description: 'A Marker Id',
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    if(!inputs.markerId){return this.res.status(400).send({'error':'No Id Found in Request'})}
         //sails.log.debug(req.body);
         updatedId = inputs.markerId;
         await Marker.destroy({id: updatedId}).fetch()
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
