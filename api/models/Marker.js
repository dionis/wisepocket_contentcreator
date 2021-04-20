/**
 * Marker.js
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

    phone: {
      type: 'string',
      required: true,
      columnName:'phone'
    },

    url: {
      type: 'string',
      required: true,
    },

    email: {
      type: 'string',
      required: true,
    },

    lat: {
      type: 'string',
      required: true,
    },

    lon: {
      type: 'string',
      required: true,
    },

    images:{
      collection: 'imagen',
      via: 'related_marker'
    },

    related_campaign: {
      model: 'campaign'
    },



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

