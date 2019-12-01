const jwt = require('jsonwebtoken');
const { findUserById } = require('../services/users');

const refreshToken = async (req, res) => {
    const refreshTokenCookie = req.signedCookies.refreshToken;
    let decoded;


    decoded = jwt.verify(
        refreshTokenCookie,
        process.env.REFRESH_TOKEN_SECRET
    );


    let userFound = await findUserById(decoded.id);
    if (!userFound) {
        return res.status(400).send({ message: "Bad Request" });
    }

    const token = jwt.sign({ id: decoded.id }, process.env.TOKEN_SECRET,
        { expiresIn: "3h" }
    );

    const refreshToken = jwt.sign({ id: userFound.id }, process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "3 days" }
    );

    return res.cookie("refreshToken", refreshToken, { signed: true, httpOnly: true })
        .send({
            token: "Bearer " + token,
            refreshToken: "Bearer " + refreshToken
        });

}

module.exports = {
    refreshToken
}