/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
  
    singUp: async function(req,res){
        const user = await User.findOne({email:req.body.email})
        if(user) return res.status(400).send('This Email is used!!!'); 
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(req.body.password,salt)
        User.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            organization: req.body.organization,
            cargo: req.body.cargo,
            password: hashpass,
        }).fetch()
        .then(user=>{
            if(!user){ return res.sendStatus(400);}
            return res.send({
                'success': true,
                'message': 'Record Created',
                'data': user 
            })
        })
        .catch(err=>{
            return res.sendStatus(500);
        })
    },

    login: async function(req,res){
        if(!(req.body.email) || !(req.body.password)){ return res.status(400).send({
            'message': 'Request must contain Email and password'
        })};
        const _user = await User.findOne({email:req.body.email}, async (err,user)=>{
            if(err){ return res.sendStatus(500);}
            if(!user){
                return res.sendStatus(400);
            }
            const validpass = await bcrypt.compare(req.body.password,user.password);
            if(!validpass) return res.sendStatus(400,{message:'Password Incorrect'});
            //sails.log.debug('Antes');
            const token = jwt.sign({ _id:user.id, 
                                    rol: user.isAdmin?'Admin':'Organization' }, 
            'hjghdvdfjvnishvishr4oo', {expiresIn: 900});
            req.session.me = token;
            //sails.log.debug(token);
            return res.send({
                'message': 'Login Successfully',
                'idToken': token,
                'expiresIn': 900
            });            
        });
    },
    
    logout: function(req, res) {
        //     const token = req.header.auth_token;
        //     res.send('SingOut'+ token);
        //   }
       // return res.send(req.session.me);
       req.session.me = null;
       sails.log.debug(req.session.me);


        // // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
        // // send a simple response letting the user agent know they were logged out
        // // successfully.
        if (req.wantsJSON) {
        return res.ok('Logged out successfully!');
        }
    },

    getUserById: (req,res)=>{
        if(!req.param('id')){
            return res.sendStatus(400,{
                'error': 'LA consulta debe tener un parametro'
            })
        }
        User.findOne({_id:req.param('id')})
        .then(user =>{
            return res.send({
                'data': user
            });
        })
        .catch(err=>{
            return res.sendStatus(500,{
                'error': err
            });
        })
    }
};

