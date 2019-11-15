const Users = require('../models').Users;
const bcrypt = require('bcrypt-nodejs');
const uuid = require("uuid");

module.exports = {
    createUsers:  async(req, res) => {
        const userToken = "Bearer " + uuid.v4();
        var salt = bcrypt.genSaltSync(10);
        ePassword = bcrypt.hashSync(req.body.password, salt);
        Users.create({
            username: req.body.username,
            email: req.body.email,
            password: ePassword,
            token: userToken
        });

        res.status(200).send({message:`email ${userToken} + ${ePassword}`})
    }
}
