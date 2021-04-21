module.exports = {


  friendlyName: 'Get all',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    const page = this.req.param('page')
    const limit  = Number(this.req.param('limit'))
    sails.log.debug(page,limit)
    await Marker.find()
    .populate('images')
    .paginate(
      page?page:0,
      limit?limit:99999999)
    .then(marker =>{
        return this.res.send({
          'success': true,
          'message': 'Records Fetched',
          'data': marker,
          'count': marker.length
        })
    })
    .catch(err=>{
        return this.res.status(500).send({
            'error': err
        })
    })

  }


};
