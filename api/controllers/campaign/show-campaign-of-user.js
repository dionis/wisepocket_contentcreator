const jwt = require('jsonwebtoken')
module.exports = {


  friendlyName: 'Show campaign of user',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    const page = this.req.param('page');
    const limit  = Number(this.req.param('limit'));
    const sortCriteria  = this.req.param('criteria');
    const filter = this.req.param('filter');
    sails.log.debug(sortCriteria, typeof sortCriteria === 'string');
    const token = this.req.header('Authorization').split('Bearer ')[1];
    sails.log.debug(this.req.param('page'));
    sails.log.debug(this.req.param('limit'));
    await jwt.verify(token,'hjghdvdfjvnishvishr4oo', async (err,payload)=>{
        if(err) return this.res.status(500).send({'error': err});
        if(!filter || filter===''){
          await Campaign.find({
            createdby: payload._id,
            })
          .sort(`${sortCriteria?sortCriteria:'id ASC'}`)
          .populate('logo')
          .paginate(
            page?page:'',
            limit?limit:99999999)
          .then(campaigns => {
            return this.res.send({
              'success': true,
              'message': 'Records Fetched',
              //'files': images,
              'data': campaigns,
              'count': campaigns.length
            })
          })
          .catch(err=>{
            return this.res.status(500).send({'error': err});
          });
        }else{
          await Campaign.find({
            createdby: payload._id,
            })
          .where({
            or:[
              { titulo: { startsWith: filter } },
              { contactoEmail: { startsWith: filter } },
              { phone: { startsWith: filter } },
              { direccionPostal: { startsWith: filter } }
            ]
          })
          .sort(`${sortCriteria?sortCriteria:'id ASC'}`)
          .populate('logo')
          .paginate(
            page?page:'',
            limit?limit:99999999)
          .then(campaigns => {
            return this.res.send({
              'success': true,
              'message': 'Records Fetched',
              //'files': images,
              'data': campaigns,
              'count': campaigns.length
            })
          })
          .catch(err=>{
            return this.res.status(500).send({'error': err});
          });
        }
       
    });
  }


};
