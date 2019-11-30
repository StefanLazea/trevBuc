const Users = require('../models').Users;
const { findUserByUsername } = require('../services/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    let userFound = await findUserByUsername(req.body.username);

    if (userFound) {
        return res.status(409).send({ message: "User already exists" });
    }

    res.status(200).send({ message: "testam" })
};

const login = async (req, res) => {

};

const logout = async (req, res) => {

};
module.exports = {
    registerUser,
    login,
    logout
}
