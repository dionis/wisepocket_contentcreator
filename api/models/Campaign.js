/**
 * Campaign.js
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
      columnName:'descripcion'
    },

    contanctoTelefono: {
      type: 'string',
      required: true,
      columnName:'contanctoTelefono'
    },

    colorPrincipal: {
      type: 'string',
      columnName:'colorPrincipal'
    },
    colorSecundario: {
      type: 'string',
      columnName:'colorSecundario'
    },

    contactoEmail: {
      type: 'string',
      required: true
    },

    direccionPostal: {
      type: 'string',
      required: true
    },

    contactoTelegram: {
      type: 'string',
      allowNull: true,
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

    carrusel1:{
      model: 'imagen',
    },

    carrusel2:{
      model: 'imagen',
    },

    carrusel3:{
      model: 'imagen',
    },

    carrusel4:{
      model: 'imagen',
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

