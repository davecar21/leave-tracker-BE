const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');

    try {
        var decoded = await jwt.verify(token, config.secret);
        if (decoded.userType == "admin") {
            next();
        } else {
            return res.status(403).send({
                response: 'FAILED',
                message: 'Unauthorized!'
            });
        }
    } catch (error) {
        return res.status(401).send({
            response: 'FAILED',
            message: error.message
        });
    }
}