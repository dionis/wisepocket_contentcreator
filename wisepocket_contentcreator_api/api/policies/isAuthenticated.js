/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to require an authenticated user, or else redirect to login page
 *                 Looks for an Authorization header bearing a valid JWT token
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {

  // Check for a JWT token in the header
  if (req.header('Authorization')) {
    // If one exists, attempt to get the header data
    var token = req.header('Authorization').split('Bearer ')[1];
    // If there's nothing after "Bearer", just redirect to login
    if (!token) {
      sails.log.debug('Mal Token');
      return res.status(400).send('Unauthorized');
    }
    // If there is something, attempt to parse it as a JWT token
    return jwt.verify(token, 'hjghdvdfjvnishvishr4oo', function(err, payload) {
      // If there's an error verifying the token (e.g. it's invalid or expired),
      // redirect to the login page.
      if (err) {
        sails.log.debug(token);
        sails.log.debug('Token Invalido');
        return res.status(400).send('Unauthrized');;
      }
      // If there's no user ID in the token, redirect to login
      if (!payload._id) {
        sails.log.debug('No id');
        return res.status(400).send('ID Not Found');;
      }
      // Otherwise try to look up that user
      User.findOne(payload._id, function(err, user) {
        if (err) { 
          sails.log.debug('User Not Found');
          return res.negotiate(err);
        }
        // If the user can't be found, redirect to the login page
        if (!user) {return res.status(400).send('User Not Found');}
        // Otherwise save the user object on the request (i.e. "log in") and continue
        req.user = user;
        return next();
      });
    });
  }

  // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
  // send a 401 response letting the user agent know they need to login to
  // access this endpoint.
  if (req.wantsJSON) {
    sails.log.debug('Entra');
    return res.sendStatus(401);
  }

  // Otherwise if this is an HTML-wanting browser, do a redirect.
};
