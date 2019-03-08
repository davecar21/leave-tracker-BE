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
router.post('/', async (req, res) => {
    try {
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