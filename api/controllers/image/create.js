module.exports = {


  friendlyName: 'Create',


  description: 'Create image.',


  inputs: {
    
  },


  exits: {

  },


  fn: async function (inputs) {
    files = await sails.helpers.fileUpload(this.req)             
    .tolerate('upload_err', (err)=>{
        return this.res.status(500).send({
            'message': 'Error while uploading files',
            'error': err
        });
    });
    images = files.filter(file => 
      (file.titulo.split('.')[1].toUpperCase() === 'JPG') || 
      (file.titulo.split('.')[1].toUpperCase() === 'PNG') ||
      (file.titulo.split('.')[1].toUpperCase() === 'JPEG'));
    await Imagen.createEach(images).fetch()
    .then(imgs=>{
      return this.res.send({
        'success': true,
        'message': 'Record Created',
        //'files': images,
        'data': imgs
      })
    }) 
    .catch(err=>{
      return this.res.status(500).send({
        'message': 'Error while saving Image objects',
        'error': err
      });
    })
    
  }


};
