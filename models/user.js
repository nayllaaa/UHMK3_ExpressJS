const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: [true, 'Silahkan Isikan nama'],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'silahkan isikan email valid!']
    }
})

module.exports = mongoose.model('user', UserSchema)