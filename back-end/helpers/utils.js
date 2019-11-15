const bcrypt = require('bcrypt-nodejs');

//TODO

const generateHashPass = function(times, pass){
    var salt = bcrypt.genSaltSync(times);
    return bcrypt.hashSync(pass, salt);
}


module.exports = {
    generateHashPass
}