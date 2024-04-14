const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const {Schema} = mongoose


const UserSchema = new Schema({
    userId:{
        type:String,
        default:Date.now()
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unquire:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('users',UserSchema)
