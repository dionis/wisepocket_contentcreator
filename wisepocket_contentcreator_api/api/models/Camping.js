/**
 * Camping.js
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

    descripcion: {
      type: 'string',
      required: true,
    },

    contanctoTelefono: {
      type: 'number',
      required: true,
    },

    colorPrincipal: {
      type: 'number'
    },
    colorSecundario: {
      type: 'number'
    },

    contactoEmail: {
      type: 'string',
      unique: true,
      required: true
    },

    direccionPostal: {
      type: 'string',
      unique: true,
      required: true
    },

    contactoTelegram: {
      type: 'string',
      allowNull: true
    },

    contactoWhatsapp: {
      type: 'string',
      allowNull: true
    },

    contactoFacebook: {
      type: 'string',
      allowNull: true
    },

    logo: {
      model: 'imagen',
      //unique: true,
    },

    createdby :{
      model: 'user'
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

