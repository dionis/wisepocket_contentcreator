
module.exports = {


  friendlyName: 'Create',


  description: 'Create information.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    if(!this.req.allParams()) return this.res.status(400).send({'error': 'Data in body Request Not Found'});
    await Information.create(this.req.allParams()).fetch()
    .then(info=>{
      return this.res.send({
        'success': true,
        'message': 'Record Created',
        'data': info
      })
    .catch(err=>{
      return this.res.status(500).send({
        'error': err
      }); 
    });
    })

  }


};
