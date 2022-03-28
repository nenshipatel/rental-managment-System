const express = require('express')
const router = new express.Router()

const Admin = require('../models/adminLogin')
const admin_auth = require('../../db/middleware/admin_auth')


// router.post('/admin/register', async (req, res) => {
//     const admin = new Admin(req.body)

//       try {
//         await admin.save() 
//         const token = await admin.generateAuthToken()
//          res.status(201).send({ admin , token})
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.get('/admin', async (req, res) => {
//     const admin =  await Admin.find({})
//     res.send(admin)
// })

// router.get('/users/me',auth, async (req, res) => {
//     res.send(req.user)
// })


router.post('/admin/login', async (req, res) => {
  try {
        const admin = await Admin.findCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        res.send({ admin, token})
    } catch (e) {
        res.status(400).send({message :"You are not Authorised Admin!!!"})
    }
})

 router.post('/admin/logout',admin_auth, async (req, res) => {
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







module.exports = router