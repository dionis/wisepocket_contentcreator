module.exports = {


  friendlyName: 'Update',


  description: 'Update information.',


  inputs: {
    informationId: {
      type: 'string',
      description: 'A Information Id'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    data = this.req.body;
    if(!inputs.informationId){return this.res.status(400).send({'error':'No Id Found in Request'})}
         //sails.log.debug(req.body);
         if(!data) return this.res.status(400).send({'error': 'Data in body Request Not Found'});
         updatedId = inputs.informationId;
         await Information.update({id: updatedId},data).fetch()
         .then(info=>{
             return this.res.send({
                'success': true,
                 'message': 'Record Edited',
                 'data': info
             })
         })
         .catch(err=>{
             return this.res.status(500).send({
               'error': err
             });
         })

  }


};
