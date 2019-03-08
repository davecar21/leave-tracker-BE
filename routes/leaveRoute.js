const express = require('express');
const router = express.Router();

const authAdmin = require('../utils/middleware/authAdmin');
const LeaveModel = require('../model/leaveModel');

router.get('/', authAdmin, async (req, res) => {
    try {
        const result = await LeaveModel.getLeave();
        return res.status(200).send(result);
    } catch (error) {
        return res.status(401).send({
            response: 'FAILED',
            message: error.message
        });
    }
});

router.get('/userInfoId', async (req, res) => {
    try {
        const result = await LeaveModel.getLeaveByUserInfoID(res.locals.token.userInfoID);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(401).send({
            response: 'FAILED',
            message: error.message
        });
    }
});

router.post('/', async (req, res) => {
    try {
        req.body.userInfoID = res.locals.token.userInfoID;
        const result = await LeaveModel.postLeave(req.body);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(401).send({
            response: 'FAILED',
            message: error.message
        });
    }
});


module.exports = router;