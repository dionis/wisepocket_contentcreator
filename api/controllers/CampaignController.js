/**
 * CampaignController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
//const jwt = require('jsonwebtoken');
 module.exports = {
 
    /*  create: async (req,res)=>{
         if(!req.body){ return res.sendStatus(400);}
         const token = req.header('Authorization').split('Bearer ')[1];
         //sails.log.debug(token);
         //const payload = await jwt.decode(token);
         await jwt.verify(token,'hjghdvdfjvnishvishr4oo', async (err,payload)=>{
             if(err) return res.status(500).send({'message': err});
             if(!payload) res.status(400).send({'message': 'Not Match Token Payload'})
            await User.findOne({id:payload._id}, async (err, user)=> {
                if (err) { 
                    //ails.log.debug('No match User');
                    return res.status(500).send({
                        'error': err
                    });
                }
                if(!user) return res.status(400).send({'error': 'User Not Found'});
                // if(req.file('campIcon')){
                // campIcon = await sails.helpers.fileUpload(req,'campIcon')
                // .tolerate('upload_err', ()=>{
                //     return res.status(500).send({
                //         'message': 'Error while uploading files'
                //     });
                // })
                // .tolerate('noImageCreated', ()=>{
                //     return res.status(500).send({
                //         'message': 'Error while saving Image objects'
                //     });
                // });
                // const campIcon = [];
                // req.file('campIcon').upload({
                //     dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
                // }, async (err,file)=>{
                //     if(err) return res.status(500).send({'error': err });
                //     if(file.length === 1){
                //         sails.log.debug(file)
                //         await Imagen.create({
                //             titulo: file[0].filename+'-'+req.body.titulo,
                //             path: file[0].fd,
                //           }).fetch()
                //         .then(img=>{
                //             sails.log.debug(img)
                //             campIcon.push(img);
                //             sails.log.debug('CampIcon',campIcon);
                //         })
                //         .catch(err=>{
                //             sails.log.debug('entra')
                //             return res.status(500).send({'error': err });
                //         });
                //     } 
                // });
                // // }
                // images = await sails.helpers.fileUpload(req,'images')                
                // .tolerate('upload_err', (err)=>{
                //     return res.status(500).send({
                //         'message': 'Error while uploading files',
                //         'error': err
                //     });
                // })
                // .tolerate('noImageCreated', (err)=>{
                //     return res.status(500).send({
                //         'message': 'Error while saving Image objects',
                //         'error': err
                //     });
                // });
                //sails.log.debug(images)
                // sails.log.debug('CampIcon',campIcon);
                // sails.log.debug('Immages',images);
                await Campaign.create({
                    titulo: req.body.titulo,
                    descripcion: req.body.descripcion,
                    contanctoTelefono: req.body.contanctoTelefono,
                    colorPrincipal: req.body.colorPrincipal,
                    colorSecundario: req.body.colorSecundario,
                    contactoEmail: req.body.contactoEmail,
                    direccionPostal: req.body.direccionPostal,
                    contactoTelegram: req.body.contactoTelegram,
                    contactoWhatsapp: req.body.contactoWhatsapp,
                    contactoFacebook: req.body.contactoFacebook,
                    createdby: user.id,
                    // logo: campIcon[0]?campIcon[0].id:null,
                    // carrusel1: images[0]?images[0].id:null,
                    // carrusel2: images[1]?images[1].id:null,
                    // carrusel3: images[2]?images[2].id:null,
                    // carrusel4: images[3]?images[3].id:null
                }).fetch()
                .then(async (campaign)=>{
                    //sails.log.debug('entra bien');
                    return res. send({
                        'success': true,
                        'message': 'Record Created',
                        //'files': images,
                        'data': campaign 
                    })
                })
                .catch(err=>{
                    sails.log.debug('entra Err');
                    return res.status(500).send(err); 
                })
            });
         })
         //sails.log.debug(payload);
         
 
     },
 
     editCampaign: async (req,res)=>{
         if(!req.param('id')){return req.status(400).send({'error':'No Id Found in Request'})}
        //  if(req.file('file')){
        //     file = await sails.helpers.fileUpload(req)
        //     .tolerate('upload_err', (err)=>{
        //        return res.status(500).send({
        //            'message': 'Error while uploading files',
        //            'error': err
        //        });
        //    })
        //    .tolerate('noImageCreated', (err)=>{
        //        return res.status(500).send({
        //            'message': 'Error while saving Image objects',
        //            'error': err
        //        });
        //    }) 
        //  }
         sails.log.debug(req.body);
         Campaign.update({id:req.param('id')},req.allParams()).fetch()
         .then(campaign=>{
             //if(req.file('campIcon')._files.length>0){
            //sails.log.debug('entra al if');
            // req.file('campIcon').upload({
            //     dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
            // }, async (err,files)=>{
            //     if(err) return res.status(500).send({'error': err });
            //     if(files.length > 0){
            //         sails.log.debug(files)
            //         sails.log.debug('CAmpaign Icon', campaign)
            //         await Imagen.update({id:campaign[0].logo},{
            //             titulo: files[0].filename,
            //             path: files[0].fd,
            //         })
            //         .then(img=>{
            //             sails.log.debug(img)
            //             // campIcon.push(img);
            //             // sails.log.debug('CampIcon',campIcon);
            //         })
            //         .catch(err=>{
            //             sails.log.debug('mal update image')
            //             return res.status(500).send({'error': err });
            //         });
            //     } 
            // });
            
            // }
             return res.send({
                 'message': 'Record Edited',
                 'data': campaign
             })
         })
         .catch(err=>{
             return res.sendStatus(500);
         })
     },
 
     deleteCampaign: (req,res)=>{
         return Campaign.destroy(req.param('camp')).fetch()
         .then(campaign =>{
             return res.send({
                 'message': 'Record Deleted',
                 'data': campaign
             })
         })
         .catch(err=>{
             return res.sendStatus(500);
         })
     },
   
     getCampaigns: (req,res)=>{
         const page = req.param('page')
         const limit  = req.param('limit')
         Campaign.find()
         .populate('createdby')
         .paginate({
             page:page?page:undefined,
             limit:limit?limit:undefined,
         })
         .then(campaigns =>{
             return res.send({
                 'message': 'Lista de Campañas',
                 'data': campaigns,
             })
         })
         .catch(err=>{
             return res.status(500).send({
                 'message': 'Imposible Mostrar',
                 'error': err
             })
         })
     },
 
     getCampaign: async (req,res)=>{
         if(!req.param('_id')){
             return res.status(400).send({
                 'error': 'ID no encontrado en el Request'
             })
         }
         await Campaign.findOne({id:req.param('_id')})
         .then(campaign=>{
             if(!campaign){ return res.status(400).send({'error':'No Campaign Foud'});}
             return res.ok({
                 'message': 'Fetched Successfully',
                 'data': campaign
             });
         })
     },
 
     getCampaignsbyUser: async (req,res)=>{
         const page = req.param('page')
         const limit  = req.param('limit')
         if(!req.param('_id')){
             return res.sendStatus(400);
         }
         await User.findOne({
             where: {id: req.param('_id')},
             select: ['campaigns']
         }).populate('campaigns')
         .paginate({
             page:page?page:undefined,
             limit:limit?limit:undefined,
         })
         .then(data => {
             return res.send({
                 'data': data
             })
         })
         .catch(err=>{
             return res.sendStatus(500);
         })
         // User.findOne(req.param('_id'), (err,user)=>{
         //     if(err){
         //         return res.sendStatus(500);
         //     }
         //     if (!user) {return res.status(400).send('User Not Found');}
         //     Campaign.find(user,(error,Campaigns)=>{
         //         if(error){
         //             return res.sendStatus(500);
         //         }
         //         if (!Campaigns || Campaigns.length === 0) {
         //             return res.sendStatus(400,{
         //                 'message':'NO existen Campañas'
         //             });
         //         }
         //         return res.send({
         //             'message': 'Lista de Campañas',
         //             'data': Campaigns
         //         })
         //     })
         // }) 
     },
 
     uploadFile: async (req,res)=>{
         file = await sails.helpers.fileUpload(req)
         .tolerate('upload_err', (err)=>{
            return res.status(500).send({
                'message': 'Error while uploading files',
                'error': err
            });
        })
        .tolerate('noImageCreated', (err)=>{
            return res.status(500).send({
                'message': 'Error while saving Image objects',
                'error': err
            });
        })
         res.send({
             'message': 'Files Uploaded Successfully',
             'files':file
         })
     },
 
     downloadImage: async (req,res)=>{
         if(req.param('fd')){
             images = await sails.helpers.fileDownload(req);
             res.contentType('image/jpg');
             res.send({
                 'data': images
             });
         }else{
             return res.status(400).send({
                 'error': 'fd parameter reqired'
             })
         }
     },
    
    deleteFile(req,res){
        path = req.param('fd');
        const fs = require('fs');
        fs.unlink(path, function(err) {
        if (err) return res.status(400).send({'error': err}); // handle error as you wish
        return res.ok();
        });    
    } */
};