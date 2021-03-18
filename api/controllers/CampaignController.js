/**
 * CampaignController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const { image } = require('d3-fetch');
const jwt = require('jsonwebtoken');
 module.exports = {
 
     create: async (req,res)=>{
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
                        'error': 'No match User'
                    });
                }
                images = await sails.helpers.fileUpload(req)
                    .tolerate('noReqImages', ()=>{ 
                        return res.status(400).send({
                            'message': 'No images founds'
                        })
                    })
                    .tolerate('upload_err', ()=>{
                        return res.status(500).send({
                            'message': 'Error whie uploading files'
                        })
                    })
                    .intercept('noImageCreated', ()=>{
                        return res.status(500).send({
                            'message': 'Imposible to save image in th BD'
                        })
                    })
                    sails.log.debug(images)
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
                    logo: images[0]?images[0].id:null,
                    carrusel1: images[1]?images[1].id:null,
                    carrusel2: images[2]?images[2].id:null,
                    carrusel3: images[3]?images[3].id:null,
                    carrusel4: images[4]?images[4].id:null
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
 
     editCampaign: (req,res)=>{
         if(!req.param('id')){return req.sendStatus(400)}
         sails.log.debug(req.allParams());
         return Campaign.update({id:req.param('id')},req.allParams()).fetch()
         .then(campaign=>{
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
                 .tolerate('noReqImages', ()=>{ 
                     return res.status(400).send({
                         'message': 'No images founds'
                     })
                 })
                 .tolerate('upload_err', ()=>{
                     return res.status(500).send({
                         'message': 'Error whie uploading files'
                     })
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
     }
 
 };