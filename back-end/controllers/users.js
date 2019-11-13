const Users = require('../models').Users;
const uuid = require("uuid");

module.exports.createUsers = async(req, res) => {
    const userToken = "Bearer " + uuid.v4();
    
    Users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        token: userToken
    });

    res.status(200).send({message:`email ${userToken}`})
}