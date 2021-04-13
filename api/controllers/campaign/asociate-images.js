module.exports = {


  friendlyName: 'Asociate images',


  description: '',


  inputs: {
    
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    // if(!inputs.images){return this.res.status(400).send({'error':'No Images Found in Request'})}
    // if(inputs.images.length <= 0){return this.res.status(400).send({'error':'Array Images Empty'})}
    // if(!inputs.id){return this.res.status(400).send({'error':'No Campaign Id was provided'})}
    // sails.log.debug(this.req.param('images'))
    // sails.log.debug(this.req.param('id'))
    //var ids = JSON.parse(this.req.param('images'))
    var images = this.req.body.images;
    var camp = this.req.body.id;
    sails.log.debug(images);
    sails.log.debug(camp);
    if(typeof ids === 'Array'){ 
      sails.log.debug(true) 
    }else{
      sails.log.debug(false)
    }
    await Campaign.addToCollection(camp,'carrusel').members(images)
    .then(camp=>{
      return this.res.send({
         'success': true,
          'message': 'Record Edited',
          'data': camp
      })
    })
    .catch(err=>{
        return this.res.status(500).send({
          'error': err
        });
    });
    return;

  }


};
