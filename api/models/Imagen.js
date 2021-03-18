/**
 * Imagen.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    titulo: {
      type: 'string',
      required: true,
      unique: true
    },

    path: {
      type: 'string',
      required: true,
      unique: true,
    },

    campaign:{
      collection: 'campaign',
      via: 'logo'
    },

    image1: {
      collection: 'campaign',
      via: 'carrusel1'
    },

    image2: {
      collection: 'campaign',
      via: 'carrusel2'
    },

    image3: {
      collection: 'campaign',
      via: 'carrusel3'
    },

    image4: {
      collection: 'campaign',
      via: 'carrusel4'
    },

    perfil: {
      collection: 'user',
      via: 'imgPerfil'
    }

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

