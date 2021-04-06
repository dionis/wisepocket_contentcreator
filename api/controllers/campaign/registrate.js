
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
    
    // sails.log.debug(this.req.allParams());
    // if(!this.req.allParams()) {return this.res.status(400).send({'error':'No Id Found in Request'})}
    // const token = this.req.header('Authorization').split('Bearer ')[1];
    // jwt.verify(token,'hjghdvdfjvnishvishr4oo', async (err,payload)=>{
    //   if(err) return this.res.status(500).send({'error': err});
    //   if(!payload) this.res.status(400).send({'message': 'Not Match Token Payload'})
      
    //   await User.findOne({where:{id:payload._id}})
    //   .then(async (user)=>{
    //     //return this.res.send({'pa':payload});
    //     await Campaign.create(this.req.allParams()).fetch()
    //     .then(async (campaign)=>{
    //       camp = await Campaign.update({id:campaign.id}).set({createdby:user.id}).fetch();
    //       if(!camp){
    //         this.res.status(400).send({'message': 'Error Updating Campaign'})
    //       }
    //       return this.res.send({
    //           'success': true,
    //           'message': 'Record Created',
    //           //'files': images,
    //           'data': camp
    //       });
    //     })
    //     .catch(err=>{
    //         //sails.log.debug(err);
    //         return this.res.status(500).send({
    //           'error': err
    //         }); 
    //     });
    
    //   })
    //   .catch(err=>{
    //       return this.res.status(500).send({
    //         'error': err
    //     });
    //   })
        
    // //   // sails.log.debug(payload)
    // //   // return this.res.send({'pa':payload});
    // });
  // }
      //sails.log.debug(this.req.allParams())
      await Campaign.create(this.req.allParams()).fetch()
        .then(async (campaign)=>{
          //sails.log.debug(campaign);
          const token = this.req.header('Authorization').split('Bearer ')[1];
          await jwt.verify(token,'hjghdvdfjvnishvishr4oo', async (err,payload)=>{
            if(err) return this.res.status(500).send({'error': err});
            if(!payload) this.res.status(400).send({'message': 'Not Match Token Payload'});
            user = await User.findOne({where:{id:payload._id}});
           // sails.log.debug(user);
            if(!user){this.res.status(400).send({'message': 'User Not Found'}) }
            camp = await Campaign.update({id:campaign.id}).set({createdby:user.id}).fetch();
            if(!camp){
              this.res.status(400).send({'message': 'Error Updating Campaign'})
            }
            return this.res.send({
              'success': true,
              'message': 'Record Created',
              'data': camp
            });
          });
          
        })
        .catch(err=>{
            return this.res.status(500).send({
              'error': err
            }); 
        });
  }
};
