const bcrypt = require('bcrypt-nodejs');

//TODO
module.exports = bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});

