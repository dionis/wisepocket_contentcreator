const jwt = require('jsonwebtoken')
module.exports = {


  friendlyName: 'Show campaign of user',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    const page = this.req.param('page')
    const limit  = this.req.param('limit')
    const token = this.req.header('Authorization').split('Bearer ')[1];
    //sails.log.debug(token);
    //const payload = await jwt.decode(token);
    await jwt.verify(token,'hjghdvdfjvnishvishr4oo', async (err,payload)=>{
        if(err) return this.res.status(500).send({'error': err});
        await Campaign.find({
          where: {createdby: payload._id},
        })
        .paginate({
            page:page?page:undefined,
            limit:limit?limit:undefined,
        })
        .then(campaigns => {
          return this.res.send({
            'success': true,
            'message': 'Records Fetched',
            //'files': images,
            'data': campaigns
          })
        })
        .catch(err=>{
          return this.res.status(500).send({'error': err});
        });

    });
  }


};
