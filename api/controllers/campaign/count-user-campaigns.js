const { result } = require("lodash");

module.exports = {


  friendlyName: 'Count user campaigns',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    const token = this.req.header('Authorization').split('Bearer ')[1];
    //sails.log.debug(token);
    //const payload = await jwt.decode(token);
    await jwt.verify(token,'hjghdvdfjvnishvishr4oo', async (err,payload)=>{
        if(err) return this.res.status(500).send({'error': err});
        await Campaign.count({
          where: {createdby: payload._id},
        })
        .then(result => {
          return this.res.send({
            'success': true,
            'message': 'Records Counted',
            //'files': images,
            'data': result
          })
        })
        .catch(err=>{
          return this.res.status(500).send({'error': err});
        });

    });

  }


};
