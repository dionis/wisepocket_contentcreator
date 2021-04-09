module.exports = {


  friendlyName: 'Create',


  description: 'Create video.',


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
      (file.titulo.split('.')[1].toUpperCase() === 'MP4') || 
      (file.titulo.split('.')[1].toUpperCase() === 'AVI') ||
      (file.titulo.split('.')[1].toUpperCase() === 'MPG'));
    await Video.createEach(images).fetch()
    .then(videos=>{
      return this.res.send({
        'success': true,
        'message': 'Record Created',
        //'files': images,
        'data': videos
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
