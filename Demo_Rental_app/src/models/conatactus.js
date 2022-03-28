const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({

    Name:{
        type:String,
        required:true,
      
    },
    email:{
        type:String,
        required:true,
      
    },
    subject:{
        type:String,
        required:true,
      
    },
  
    message:{
        type:String,
        required:true,
      
    },
    isDeleted:{
        type:Boolean,
        default:false 
     }
},{
    timestamps: true
});


const Conatct= mongoose.model('Conatct',contactSchema)
module.exports = Conatct