/**
 * ImagenController
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
        const user = await User.findOne({id:payload._id})
        await Imagen.create({
            titulo: req.body.titulo,
            path: req.body.path,
            perfil: payload._id
        })
        .then(imgen=>{
            return res.send({
                'data': imgen,
            })
        })
        .catch(err=>{
            return res.send({
                'error': err,
            }) 
        })
    }
};

