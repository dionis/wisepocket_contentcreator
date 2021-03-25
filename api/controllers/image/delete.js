const { image } = require("d3-fetch");

module.exports = {


  friendlyName: 'Delete',


  description: 'Delete image.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    imageId = this.req.param('_id')
    if(!imageId) return this.res.status(400).send({'message': 'You most provide a Id'});
    await Imagen.destroy({id: imageId}).fetch()
    .then(async (imagen)=>{
      //sails.log.debug('Imagen',imagen)
      //sails.log.debug('Path',imagen.path)
      if(imagen.length === 0) return this.res.status(400).send({'message': `No Image Found with ${imageId}`})
      message = await sails.helpers.deleteFile(imagen[0].path)
      .tolerate('errorWhileUnliking', (err)=>{
        return this.res.status(500).send({
          'message': 'Imposible Delete File',
          'error': err
        })
      })
      .tolerate('pathRequired', ()=>{
        return this.res.status(400).send({
          'message': 'You most provide a path of file',
        })
      })
      this.res.send(message);
    })
    .catch(err=>{
      return this.res.status(500).send({
        'error': err
      }); 
    })

    
    
    return;

  }


};
