const Users = require("../models").Users;

const findUserByUsername = async (username) => {
    let userFound;
    await Users.findOne({
        where: {
            username: username
        }
    }).then((user) => userFound = user);

    return userFound;
}

const findUserById = async (id) => {
    let userFound;
    await Users.findOne({
        where: {
            id: id
        }
    }).then(user => userFound = user);
    return userFound;
}
module.exports = {
    findUserByUsername,
    findUserById
}