// const jwt =require('jsonwebtoken');
// // const User = require('../../models/user')
// const Admin = require('../../admin/models/adminLogin')
// const admin_auth = async (req,res,next)=>{
    
//     try{

//         const token = req.header('Authorization').replace('Bearer ','');
//         const decode = jwt.verify(token,'thisisasecretformyapp')

//         const admin = await Admin.findOne({_id:decode._id,'tokens.token':token})
  
//         if(!admin){
//             throw new Error()
//         }
//         req.token=token;
//         req.admin = admin;
       
//         next()


//     }catch(e){
//         res.status(401).send("Please , Authorise User!!") 
//        }
// }




const jwt =require('jsonwebtoken');
const Admin = require('../../admin/models/adminLogin')

const adminAuth = async (req,res,next)=>{
    
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decode = jwt.verify(token,'thisisasecretformyapp')
        const admin = await Admin.findOne({_id:decode._id,'tokens.token':token})
        //console.log(admin)
        if(!admin){
            throw new Error()
        }
        req.token=token;
        req.admin=admin;
       
        next()


    }catch(e){
        res.status(401).send("Please , Authorise User!!") 
       }
}


module.exports = adminAuth;

