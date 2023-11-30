const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        unique: false,
    },
    email : {
        type: String,
        require: true,
        unique: true,
    },
    role : {
        type: String,
        require: true,
        unique: false,
    },
});

module.exports = mongoose.model('User', userSchema);