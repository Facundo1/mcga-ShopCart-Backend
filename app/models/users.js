const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    address: {
        type: String
    }   
}, {versionKey: false})

const User = mongoose.model('users',UserSchema)

module.exports = User