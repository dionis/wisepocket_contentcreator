module.exports = {


  friendlyName: 'Asociate images Marker',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    var images = this.req.body.images;
    var marker = this.req.body.id;
    sails.log.debug(images);
    sails.log.debug(marker);
    if(typeof ids === 'Array'){ 
      sails.log.debug(true) 
    }else{
      sails.log.debug(false)
    }
    await Marker.addToCollection(marker,'images').members(images)
    .then(marker=>{
      return this.res.send({
         'success': true,
          'message': 'Images Asociate',
          'data': marker
      })
    })
    .catch(err=>{
        return this.res.status(500).send({
          'error': err
        });
    });

  }


};
