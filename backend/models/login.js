const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    
    name: {
        type: String,
    },
    password: {
        type: String,
    },
});
module.exports = mongoose.model('login', LoginSchema);
