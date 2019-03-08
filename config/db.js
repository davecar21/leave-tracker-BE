const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://tester1:tester1@ds147995.mlab.com:47995/leave-tracker', {
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('db connection SUCCESS')
    })
    .catch((error) => {
        console.log('db connection FAILED')
    });


module.exports = mongoose;