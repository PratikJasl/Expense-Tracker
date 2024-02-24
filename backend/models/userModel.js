const {Schema, mongoose, model} = require('mongoose');

const userSchema = new Schema({
    username: {type: String, required:true, min:4, unique: true},
    password: {type: String, required:true, min:6}
})

const userModel = model('userData', userSchema);

module.exports = userModel;