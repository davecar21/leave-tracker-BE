const express = require('express');
const cors = require('cors');
var morgan = require('morgan')
const app = express();


app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

// Config
const db = require('./config/db');
const config = require('./config/config');

// Routes
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const leaveRoute = require('./routes/leaveRoute');

// Middleware
const auth = require('./utils/middleware/auth');


//Routes

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Leave API!'
    })
});

app.use('/auth', authRoute);
app.use('/leave', leaveRoute);
app.use('/user', auth, userRoute);

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`));