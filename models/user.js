const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema = new schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    username: {type: String, required: true},
    mail: {type: String},
    password: {type:String, required: true},
    status: {type: Boolean, default: false}
})

UserSchema.virtual('fullname').get(function () {
    return `${this.name} ${this.surname}`
})

module.exports = mongoose.model('User', UserSchema);