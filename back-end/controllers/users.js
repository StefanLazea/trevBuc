const Users = require('../models').Users;
const { findUserByUsername } = require('../services/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    let userFound = await findUserByUsername(req.body.username);
    //todo validation for username + password;
    if (userFound) {
        return res.status(409).send({ message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    //fails if the password attribute is not found in body
    ePassword = bcrypt.hashSync(req.body.password, salt);

    try {
        Users.create({
            username: req.body.username,
            password: ePassword
        });
    } catch (err) {
        return res.send(err);
    }

    res.status(201).send({ message: `User created` });
};

const login = async (req, res) => {
    let userFound = await findUserByUsername(req.body.username);

    if (!userFound) {
        return res.status(404)
            .send({ message: "No email related to an accout was found" });
    }

    const validPass = bcrypt.compareSync(req.body.password, userFound.password);
    if (!validPass) {
        return res.status(400).send({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: userFound.id }, process.env.TOKEN_SECRET,
        {
            expiresIn: "3h"
        });

    const refreshToken = jwt.sign({ id: userFound.id }, process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "3 days" }
    );

    res.cookie("refreshToken", refreshToken, { signed: true, httpOnly: true })
        .send({
            token: "Bearer " + token,
            registerUser: "Bearer " + refreshToken
        })
};

//todo
const logout = async (req, res) => {

};

module.exports = {
    registerUser,
    login,
    logout
}
