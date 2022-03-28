const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({

    pTitle:{
        type:String,
        required:true,
      
    },
    status:{
        type:String,
        required:true,
      
    },
    type:{
        type:String,
        required:true,
      
    },
    price:{
        type:Number,
        required:true,
      
    },
    area:{
        type:String,
        required:true,
      
    },
    badRoomCount:{
        type:Number,
        required:true,
        default:1
    },
    bathRoomCount:{
        type:Number,
        required:true,
        default:1
    },
    address:{
        type:String,
        required:true,
      
    },
    city:{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'City'
    },
    state:{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'State'
    },
    pinCode:{
        type:Number,
        required:true,
      
    },
    images: [
       {
          type: Object,
          required:true
        },
    
      ],
   owner:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref:'User'
    },
    isDeleted:{
        type:Boolean,
        default:false 
     }
},{
    timestamps: true
});


const Property = mongoose.model('Property',propertySchema )
module.exports = Property