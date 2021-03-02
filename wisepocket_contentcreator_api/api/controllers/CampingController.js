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
            .then(camping=>{
                return res.send({
                    'success': true,
                    'message': 'Record Created',
                    'data': camping 
                })
            })
            .catch(err=>{
                return res.sendStatus(500); 
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
        Camping.find().populate('createdby')
        .then(campings =>{
            return res.send({
                'message': 'Lista de Campañas',
                'data': campings,
            })
        })
        .catch(err=>{
            return res.sendStatus(400,{
                'message': 'Imposible Mostrar',
                'error': err
            })
        })
    },

    getCampingsbyUser: async (req,res)=>{
        if(!req.param('_id')){
            return res.sendStatus({
                'error': 'User ID no encontrado en el Request'
            })
        }
        const us = await User.findOne({
            where: {id: req.param('_id')},
            select: ['campings']
        }).populate('campings')
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
    }

};

