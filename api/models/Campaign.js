/**
 * Campaign.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */



module.exports = {

  attributes: {

    nombre: {
      type: 'string',
      unique: true,
      required: true,
    },

    fecha: {
      type: 'string',
      columnType: 'date'
    },

    // user: {
    //   collection: 'user',
    //   via: 'campings'
    // }
  },



};

