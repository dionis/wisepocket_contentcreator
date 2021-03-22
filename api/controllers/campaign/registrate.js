
var jwt = require('jsonwebtoken');
module.exports = {

  friendlyName: 'Create Campaign Action',


  description: 'To create a new Campagin',


  inputs: {
    campaign: {
      type: 'ref',
      descripcion: 'Object that contains key-value pairs of Campaign properties'
    },
  },
  
  exits: {
  
  },


  fn: async function (inputs) {
    
    sails.log.debug(inputs.campaign);
    if(!inputs.campaign) {return this.res.status(400).send({'error':'No Id Found in Request'})}
    const token = this.req.header('Authorization').split('Bearer ')[1];
    await jwt.verify(token,'hjghdvdfjvnishvishr4oo', async (err,payload)=>{
      if(err) return res.status(500).send({'error': err});
      if(!payload) res.status(400).send({'message': 'Not Match Token Payload'})
      await User.findOne({id:payload._id}, async (err, user)=> {
          if (err) { 
              //ails.log.debug('No match User');
              return res.status(500).send({
                  'error': err
              });
          }
        await Campaign.create(inputs.campaigns).fetch()
        .then(async (campaign)=>{
          camp = await Campaign.update({id:campaign.id}).set({createdby:user.id});
          return this.res.send({
              'success': true,
              'message': 'Record Created',
              //'files': images,
              'data': camp
          });
        })
        .catch(err=>{
            //sails.log.debug(err);
            return this.res.status(500).send({
              'error': err
            }); 
        });
      });
    });
  }
};
