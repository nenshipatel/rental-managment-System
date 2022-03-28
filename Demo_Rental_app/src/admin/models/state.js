const mongoose = require('mongoose')
const validator = require('validator')
const stateSchema = new mongoose.Schema({

    stateName:{
        type:String,
        unique:true,
        required:true,
        
    },
    isDeleted:{
       type:Boolean,
       default:false 
    }
},{
    timestamps: true
});


const State = mongoose.model('State', stateSchema)
module.exports = State