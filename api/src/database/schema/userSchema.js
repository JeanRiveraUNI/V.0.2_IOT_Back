const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true,
    },
    password : {
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
        enum: ['Docente', 'Alumno'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    lastUpdate_at: {
        type: Date,
        default: Date.now,
    },
}, {
    versionKey: false,
});
// Antes de guardar el usuario, hasheamos la contraseña y actualizamos la fecha de creación
userSchema.pre('save', async function (next) {
    try {
        const currentDate = new Date();
        this.lastUpdate_at = currentDate;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});
// metodo para comparar las contraseñas
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('User', userSchema);

/*
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
*/