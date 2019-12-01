const jwt = require('jsonwebtoken');
const { findUserById } = require('../services/users');

const refreshToken = async (req, res) => {
    const refreshTokenCookie = req.signedCookies.refreshToken;
    let decoded;
    try {
        decoded = jwt.verify(
            refreshTokenCookie,
            process.env.REFRESH_TOKEN_SECRET
            // (err, decoded) => {
            //     if (err) {
            //         res.status(403).send({ message: "Forbidden", error: err });
            //     }
            // }
        );
    } catch (err) {
        return res.status(403).send({ message: "Forbidden", error: err });
    }

    let userFound = await findUserById(decoded.id);
    if (!userFound) {
        return res.status(400).send({ message: "Bad Request" });
    }

    res.send({ message: decoded });

}

module.exports = {
    refreshToken
}