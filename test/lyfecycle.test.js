var sails = require('sails');
var bcrypt = require('bcrypt')
// Before running any tests...
before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(50000);

  sails.lift({
    // Your sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    hooks: { grunt: false },
    log: { level: 'warn' },

  }, function(err) {
    if (err) { return done(err); }

    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)
    // By convention, this is a good place to set up fake data during development.
    const salt =  bcrypt.genSalt(10);
    const hashpass =  bcrypt.hash('12345678',salt)
    // await User.createEach([
    //   { email: 'admin@example.com', phone:'+53552448', name: 'Ryan Dahl', fullName: 'Ryan Dahl', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('12345678') },
    // ]);

    User.createEach([
        { email: 'admin@example.com', phone:'+53552448', name: 'Ryan Dahl', fullName: 'Ryan Dahl', isSuperAdmin: true, password: hashpass },
    ]);
     done();
  });
});

// After all tests have finished...
after(function(done) {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);

});
