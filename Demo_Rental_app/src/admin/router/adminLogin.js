const express = require('express')
const router = new express.Router()

const Admin = require('../models/adminLogin')
const adminAuth = require('../../db/middleware/admin_auth')
const bycript = require('bcryptjs');

router.post('/admin/register', async (req, res) => {
    const admin = new Admin(req.body)

      try {
        await admin.save() 
        const token = await admin.generateAuthToken()
         res.status(201).send({ admin , token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.get('/admin', async (req, res) => {
//     const admin =  await Admin.find({})
//     res.send(admin)
// })

router.get('/admin/me',adminAuth, async (req, res) => {
    res.send(req.admin)
})


router.post('/admin/login', async (req, res) => {
  try {
        const admin = await Admin.findCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        res.send({ admin, token})
    } catch (e) {
        res.status(400).send({message :"You are not Authorised Admin!!!"})
    }
})

 router.post('/admin/logout',adminAuth, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()

        res.send()
    } catch (e) {
        res.status(500).send({message :"Something went Wrong!!!"})
    }
});


router.put('/admin/cahngePassword/:id',adminAuth,async (req ,res)=>{

    try{
        const admin = await Admin.findOne({_id:req.admin._id})
   
   
        const ismatch = await bycript.compare(req.body.oldpassword,req.admin.password)
        if(!ismatch) throw new Error("you entered wrong password!")


        updatedPassword = await bycript.hash(req.body.newpassword,8)
        const updateAdmin = await Admin.updateOne({_id:admin._id},{$set:{password:updatedPassword}},{new:true});
        res.send({message:"Your password is sucessfully changed"})

    }catch(e){
        return res.status(500).send({errorMessage:"you entered wrong password!"});
    }

})







module.exports = router