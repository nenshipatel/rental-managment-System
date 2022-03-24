const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({

    cityName:{
        type:String,
        //required:true,
      
    },
   
    state:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
      // type:String,
        ref:'State'
    },
    images: [
        {
           type: Object,
           required:true
         }
    ],
  
    isDeleted:{
        type:Boolean,
        default:false 
     }
},{
},{
    timestamps: true
});


const City = mongoose.model('City', citySchema)
module.exports = City