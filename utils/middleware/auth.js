const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({
            response: 'FAILED',
            message: 'Access Denied, no token found!'
        });
    }

    try {
        let decoded = await jwt.verify(token, config.secret);
        res.locals.token = decoded;
        next();
        
    } catch (error) {
        return res.status(401).send({
            response: 'FAILED',
            message: error.message
        });
    }
}