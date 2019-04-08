const express = require('express');
const router = express.Router();

const auth = require('../utils/middleware/auth');
const LeaveModel = require('../model/leaveModel');


router.get('/:id', async (req, res) => {
    try {
        const result = await LeaveModel.getLeaveById(req.params.id);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(401).send({
            response: 'FAILED',
            message: error.message
        });
    }
});

router.get('/', async (req, res) => {
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
router.post('/', auth, async (req, res) => {
    try {
        req.body.userID = res.locals.token._id;
        console.log(req.body);
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