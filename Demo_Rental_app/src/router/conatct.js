const express = require('express')
const router = new express.Router()
const Contact = require('../models/conatactus')


router.post('/conatct',async (req,res)=>{
    const contact = new Contact({...req.body})
    try{
        await contact.save()
        res.status(201).send({message:"Thank you for feedback!!!"})
    }
    catch(e){
        res.status(400).send(e)
    }
    
   });


router.get('/contact',async (req,res)=>{
    //const _id = req.params.id 
 try{
     //const task = await Task.findById(_id)
     const con = await Contact.find({isDeleted:false})
     if(!con){
         res.status(500).send() 
      }
      res.send(con)
 }
 catch(e){
     res.status(500).send()
 }
}); 

router.get('/contact_count',async (req,res)=>{
try{
   
     const contact_count = await Contact.find({isDeleted:false}).count();
   
      res.json({contact_count})
 }
 catch(e){
     res.status(500).send()
 }
}); 


router.delete('/contact/delete/:id',async (req,res)=>{
    try{
     
        const con = await Contact.findOneAndUpdate({_id: req.params.id },
            {
                isDeleted:true
            },{
                new:true
            })
        if(!con ){
            return res.status(500).send()
        }
        res.send(con)
    }catch(e){
        res.status(500).send()
    }
})
module.exports=router