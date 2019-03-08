const express = require('express');
const router = express.Router();

const UserModel = require('../model/userModel');
var _ = require('lodash');


router.post('/', async (req, res) => {
    try {
        const result = await UserModel.auth(req.body);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(401).send({
            response: 'FAILED',
            message: error.message
        });
    }
});



module.exports = router;