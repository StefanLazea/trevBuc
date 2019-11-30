const Users = require('../models').Users;
const bcrypt = require('bcryptjs');
const uuid = require("uuid");

module.exports = {
    createUsers: (req, res) => {
        const userToken = "Bearer " + uuid.v4();
        // var salt = bcrypt.genSaltSync(10);
        // ePassword = bcrypt.hashSync(req.body.password, salt);
        Users.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            token: userToken
        });

        res.status(200).send({ message: `email ${userToken} + ${req.body.username}` })
    }
}
