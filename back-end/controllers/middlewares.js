const jwt = require('jsonwebtoken');

const verifyToken = function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: 'Not authorized' });
    }


    const trimmedToken = token.split(" ")[1];
    const verified = jwt.verify(trimmedToken, process.env.TOKEN_SECRET,
        function (err, decoded) {
            if (err) {
                return res.status(403).send({ message: "Forbidden1", err: err });
            } else {
                req.user = verified;
                next();
            }
        });

}

module.exports = {
    verifyToken
}
