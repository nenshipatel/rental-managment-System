const express = require('express')
const router = new express.Router()
const User = require('../models/user.js')
const auth = require('../db/middleware/auth')
const multer = require('multer');
const path = require('path');

const sendGrid = require('./sendGrid.js');
const bycript = require('bcryptjs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/user-images");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const filefilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Ivalid file formate"), false);
    }
  };
  
  const upload = multer({
    storage: storage,
    fileFilter: filefilter,
    limits: 1000000,
  });



router.post('/users', async (req, res) => {

   // try{
        const user1 = await User.find({email: req.body.email})
        if(user1.length!=0){
          res.send({message : " This Email is already Exits!! "})
        
        }
        else{
           
            const user = new User(req.body)
          
            sendGrid.registrationSendMail(req.body.email)
            await user.save() 
            res.status(201).send({ message :"Your Account is sucessfully Created!!"})
         }
    // }
    //  catch (e) {
    //    res.status(400).send()
    // }


})

router.get('/users', async (req, res) => {
    const limit = 5;
    const skip = (req.query.page - 1) * limit;
    const users =  await User.find({isDeleted:false}).skip(skip).limit(limit);
    const user_count =  await User.find({isDeleted:false}).count();
     res.json({users:users,user_count:user_count})
})



router.get('/users_count', async (req, res) => {
    try{
        const users_count =  await User.find({isDeleted:false}).count()
        res.json({users_count})
    }
  catch(e){
      res.send(e)
  }
})



router.get('/users/me',auth, async (req, res) => {
    const user = await User.findOne({_id:req.user._id}).populate("city").populate("state")
    res.send(user)
})


router.post('/users/login', async (req, res) => {
  try {
        const user = await User.findCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user , token})
    } catch (e) {
        res.status(404).send({errMessage :"Your  credential are Wrong !!!"})
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
});


router.post('/users/logoutAll', auth, async (req, res) => {
     try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})



router.delete('/users/delete/:id', async (req, res) => {
    try{
     
        const user = await User.findOneAndUpdate({_id: req.params.id },
            {
                isDeleted:true
            },{
                new:true
            })
        if(!user){
            return res.status(500).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})


router.put('/user/edit',auth ,upload.array("images", 1),async (req ,res)=>{


    const data = {
        ...req.body,
        owner : req.user._id,

        }
      
        if (req.files.length) {
        const image = req.files
        data.images = image
        }
        
        try {
        const user = await User.findByIdAndUpdate({_id : req.user.id}, {
        $set : data
        },{
        new: true
        }
        );
        
        await user.save();
        res.send({message:"Data Updated sucessfully!"});
        } catch (e) {
        res.status(500).send({ error: e })
        }


})



router.put('/user/resetPassword/:id',async (req ,res)=>{

    try{
        
    const id = req.params.id;

    updatedPassword = await bycript.hash(req.body.password,8)
    const updateUser = await User.updateOne({_id:id},{$set:{password:updatedPassword}},{new:true});
     res.send({message:"Your password is reset! Please,login throgh it."})

    }catch(e){
        return res.status(500).send({errorMessage:"Something went wrong!"});
    }

})



router.put('/user/cahngePassword',auth,async (req ,res)=>{

    try{
    
 
        const user = await User.findOne({_id:req.user._id})
   
        const ismatch = await bycript.compare(req.body.oldPassword,user.password)
        if(!ismatch) throw new Error("you entered wrong password!")


        updatedPassword = await bycript.hash(req.body.newPassword,8)
        const updateUser = await User.updateOne({_id:req.user._id},{$set:{password:updatedPassword}},{new:true});
        res.send({message:"Your password is sucessfully changed"})

    }catch(e){
        return res.status(500).send({errorMessage:"you entered wrong password!"});
    }

})






router.get('/users/email', async (req, res) => {
    try{

        const email = req.query.email
        
         const userEmail =  await User.find({email:email})
        
        if(userEmail.length === 0){
           return res.status(404).send({message:"This email address is not match!"})
        }
        res.send(userEmail)

         await sendGrid.forgetPassword(email,userEmail[0]._id)

    }
    catch(e){
      res.send(e)
    }
})

module.exports = router