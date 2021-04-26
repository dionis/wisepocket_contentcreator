module.exports = {


  friendlyName: 'Download',


  description: 'Download  file (returning a stream).',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    imageId = this.req.param('_id')
    sails.log.debug('Path',imageId)
    if(!imageId) return this.res.status(400).send({'message': 'You most provide a Id'});
    await Imagen.findOne({id: imageId})
    .then(async (imagen)=>{
      sails.log.debug('Imagen',imagen)
      if(!imagen) return this.res.status(400).send({'message': `No Image Found with ${imageId}`})
      files = await sails.helpers.fileDownload(imagen.path)
      .tolerate('download_err', (err)=>{
        return this.res.status(500).send({
          'message': 'Imposible Delete File',
          'error': err
        })
      })
      sails.log.debug('File',files)
      this.res.send({
        'data': files
      });
    })
    .catch(err=>{
      return this.res.status(500).send({
        'error': err
      }); 
    })
    // All done.
    return;

  }


};
