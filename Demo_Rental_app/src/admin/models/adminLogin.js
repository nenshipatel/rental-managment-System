const mongoose = require('mongoose')
const validator = require('validator')
const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')



const AdminLoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
  
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

},

{
    timestamps: true
})



AdminLoginSchema.methods.toJSON = function(){
    const admin = this;
    const adminObject = admin.toObject();

    delete adminObject.password;
    delete adminObject.tokens;
   

     return adminObject;
}

AdminLoginSchema.methods.generateAuthToken= async function(){
    const admin = this;
    const token = jwt.sign({_id: admin.id.toString()},'thisisasecretformyapp')
    admin.tokens = admin.tokens.concat({token});
     await admin.save()
     return token;

}
AdminLoginSchema.statics.findCredentials=async (email,password)=>{
    const admin = await Admin.findOne({email})
   
    if(!admin){
        throw new Error('Unable to Login!!')
    }

    const ismatch = await bycript.compare(password,admin.password)
    if(!ismatch) throw new Error("unable to login")

    return admin;
}

AdminLoginSchema.pre('save',async function(next){
    const admin = this

    if(admin.isModified('password')){
        admin.password = await bycript.hash(admin.password,8)
    }

    next()
})


const Admin = mongoose.model('Admin',AdminLoginSchema);


module.exports = Admin