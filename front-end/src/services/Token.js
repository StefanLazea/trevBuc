const jwt = require('jsonwebtoken');
const secret = require("../../src/configuration.json").token_secret;

const getUserId = () => {
    let token = localStorage.getItem('token');
    const trimmedToken = token.split(" ")[1];
    const decode = jwt.verify(trimmedToken, secret);
    return decode.id;
}

const getToken = () => {
    return localStorage.getItem('token');
}
module.exports = {
    getUserId,
    getToken
}