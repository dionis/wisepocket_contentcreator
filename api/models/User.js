/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'string',
      unique: true,
      columnName:'_id'
    },

    name: {
      type: 'string',
      required: true,
    },

    email: {
      type: 'string',
      unique: true,
      required: true,
    },

    phone:{
      type: 'string',
      required: true,
    },

    organization: {
      type: 'string',
      allowNull: true
    },

    cargo:{
      type: 'string',
      allowNull: true
    },

    password:{
      type: 'string',
      unique: true,
      required: true,
    },

    isAdmin:{
      type: 'boolean',
      defaultsTo: false,
    },

    isOrganization:{
      type: 'boolean',
      defaultsTo: true,
    },

    active: {
      type: 'boolean',
      defaultsTo: true,
    },

    campings: {
      collection: 'camping',
      via: 'createdby'
    },

    imgPerfil: {
      collection: 'imagen',
      via: 'perfil'

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

