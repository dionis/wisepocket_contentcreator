module.exports = {


  friendlyName: 'Showall',


  description: 'Showall campaign.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const page = this.req.param('page')
    const limit  = this.req.param('limit')
    await Campaign.find()
    .populate('createdby')
    .paginate({
        page:page?page:undefined,
        limit:limit?limit:undefined,
    })
    .then(campaigns =>{
        return this.res.send({
          'success': true,
          'message': 'Records Fetched',
          'data': campaigns
        })
    })
    .catch(err=>{
        return this.res.status(500).send({
            'error': err
        })
    })
  }


};
