const jwt = require('jsonwebtoken');
const secret = require('../configuration.json').token_secret;

const verifyToken = function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: 'Not authorized' });
    }

    const trimmedToken = token.split(" ")[1];
    const verified = jwt.verify(trimmedToken, secret,
        function (err, decoded) {
            if (err) {
                return res.status(403).send({ message: "Forbidden", err: err });
            } else {
                req.user = decoded;
                next();
            }
        });
}

module.exports = {
    verifyToken
}
