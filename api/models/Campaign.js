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

    country: {
      type: 'string',
      required: true
    },

    city:{
      type: 'string',
      required: true
    },

    state: {
      type: 'string',
      required: true
    },

    logo: {
      model: 'imagen',
      //unique: true,
    },

    carrusel:{
      collection: 'imagen',
      via: 'related_campaign'
    },
    
    createdby :{
      model: 'user'
    },

    informations: {
      collection: 'information',
      via: 'campaign'
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

