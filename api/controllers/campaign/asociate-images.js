module.exports = {


  friendlyName: 'Asociate images',


  description: '',


  inputs: {
    id: {
      type: 'string',
      required: true,
      despcription: 'Information Id'
    },

    images: {
      type: 'ref',
      required: true,
      despcription: 'Images of Information'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    if(!inputs.images){return this.res.status(400).send({'error':'No Images Found in Request'})}
    if(inputs.images.length <= 0){return this.res.status(400).send({'error':'Array Images Empty'})}
    if(!inputs.id){return this.res.status(400).send({'error':'No Campaign Id was provided'})}
    var images = inputs.images;
    var camp = inputs.id;
    await Campaign.addToCollection(camp,'images').members(images).fetch()
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
    })
    return;

  }


};
