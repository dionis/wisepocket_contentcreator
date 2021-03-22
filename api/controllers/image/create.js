module.exports = {


  friendlyName: 'Create',


  description: 'Create image.',


  inputs: {
    
  },


  exits: {

  },


  fn: async function (inputs) {
    images = await sails.helpers.fileUpload(this.req)                
    .tolerate('upload_err', (err)=>{
        return this.res.status(500).send({
            'message': 'Error while uploading files',
            'error': err
        });
    })
    .tolerate('noImageCreated', (err)=>{
        return this.res.status(500).send({
            'message': 'Error while saving Image objects',
            'error': err
        });
    });
    return this.res.send({
      'success': true,
      'message': 'Record Created',
      //'files': images,
      'data': images
    })
  }


};
