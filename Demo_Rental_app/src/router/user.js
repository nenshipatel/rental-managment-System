const express = require('express')
const router = new express.Router()
const User = require('../models/user.js')
const auth = require('../db/middleware/auth')
const multer = require('multer');
const path = require('path');
const SendGrid = require("./sendGrid")
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

    try{
        const user1 = await User.find({email: req.body.email})
        if(user1.length!=0){
          res.send({message : " This Email is already Exits!! "})
        
        }
        else{
            console.log("new User")
            const user = new User(req.body)
            await user.save() 
            SendGrid.main()
            res.status(201).send({ message :"Your Account is sucessfully Created!!"})
        }
    }
     catch (e) {
       res.status(400).send()
    }


})

router.get('/users', async (req, res) => {
    const users =  await User.find({isDeleted:false})
    res.json({users})
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
    res.send(req.user)
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

module.exports = router