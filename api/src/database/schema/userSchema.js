const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email : {
        type: String,
        require: true,
    },
    role : {
        type: String,
        require: true,
    }},{
        versionKey: false,
    }
);
userSchema.methods.passwordencrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
module.exports = model('User', userSchema);