/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  'campaign/*': 'isAuthenticated',
  'image/*': 'isAuthenticated',

  UserController: {
    '*': 'isAuthenticated',
    login: true,
    singUp: true,
    logout: true,
  },

  CampaignController: {
    '*': 'isAuthenticated',
    create: true,
    editCampaign: true,
    getCampaigns:true,
    deleteCampaign:true,
    downloadImage: true,
    uploadFile:true,
    deleteFile:true,
    getCampaign: true,
  },

  ImagenController: {
    '*': 'isAuthenticated',
    create: true,
  },

};
