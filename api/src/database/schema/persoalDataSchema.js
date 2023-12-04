const mongoose = require('mongoose');

const personalDataSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
});

const PersonalData = mongoose.model('PersonalData', personalDataSchema);

module.exports = PersonalData;