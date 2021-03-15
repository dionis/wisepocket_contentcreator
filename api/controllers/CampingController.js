/**
 * CampingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require('jsonwebtoken');
module.exports = {

    create: async (req,res)=>{
        if(!req.body){ return res.sendStatus(400);}
        const token = req.header('Authorization').split('Bearer ')[1];
        sails.log.debug(token);
        const payload = await jwt.decode(token);
        sails.log.debug(payload);
        await User.findOne({id:payload._id}, async (err, user)=> {
            if (err) { 
                sails.log.debug('No match User');
                return res.sendStatus(500);
            }
            await Camping.create({
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
                createdby: user.id
            }).fetch()
            .then(async (camping)=>{
                sails.log.debug('entra bien');
                images = await sails.helpers.fileUpload(req)
                .tolerate('noUsersFound', ()=>{ 
                    res.status(500).send({
                        'error': 'error Uploading'
                    })
                });
                sails.log.debug(images);
                return res.send({
                    'success': true,
                    'message': 'Record Created',
                    'files': images,
                    'data': camping 
                })
            })
            .catch(err=>{
                sails.log.debug('entra Err');
                return res.status(500).send(err); 
            })
        })

    },

    editCamping: (req,res)=>{
        if(!req.param('camp')){return req.sendStatus(400)}
        return Camping.update({id:req.param('camp')},req.allParams()).fetch()
        .then(camping=>{
            return res.send({
                'message': 'Record Edited',
                'data': camping
            })
        })
        .catch(err=>{
            return res.sendStatus(500);
        })
    },

    deleteCamping: (req,res)=>{
        return Camping.destroy(req.param('camp')).fetch()
        .then(camping =>{
            return res.send({
                'message': 'Record Deleted',
                'data': camping
            })
        })
        .catch(err=>{
            return res.sendStatus(500);
        })
    },
  
    getCampings: (req,res)=>{
        const page = req.param('page')
        const limit  = req.param('limit')
        Camping.find()
        .populate('createdby')
        .paginate({
            page:page?page:undefined,
            limit:limit?limit:undefined,
        })
        .then(campings =>{
            return res.send({
                'message': 'Lista de Campañas',
                'data': campings,
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
        await Camping.findOne({id:req.param('_id')})
        .then(campaign=>{
            if(!campaign){ return res.status(400).send({'error':'No Campaign Foud'});}
            return res.ok({
                'message': 'Fetched Successfully',
                'data': campaign
            });
        })
    },

    getCampingsbyUser: async (req,res)=>{
        const page = req.param('page')
        const limit  = req.param('limit')
        if(!req.param('_id')){
            return res.sendStatus(400);
        }
        await User.findOne({
            where: {id: req.param('_id')},
            select: ['campings']
        }).populate('campings')
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
        //     Camping.find(user,(error,campings)=>{
        //         if(error){
        //             return res.sendStatus(500);
        //         }
        //         if (!campings || campings.length === 0) {
        //             return res.sendStatus(400,{
        //                 'message':'NO existen Campañas'
        //             });
        //         }
        //         return res.send({
        //             'message': 'Lista de Campañas',
        //             'data': campings
        //         })
        //     })
        // }) 
    },

    downloadImage: async (req,res)=>{
        if(req.param('fd')){
            image = await sails.helpers.fileDownload(req);
            res.contentType('image/jpg');
            res.send({
                'data': image
            });
        }else{
            return res.status(400).send({
                'error': 'fd parameter reqired'
            })
        }
    }

};

