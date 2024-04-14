const mongoose = require('mongoose')
const {Schema} = mongoose


const dairySchema = new Schema({
    dairyId:{
        type:String,
        default:Date.now()
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unquire:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    location:{
        type:String,
    }
})

module.exports = mongoose.model('dairy',dairySchema)
