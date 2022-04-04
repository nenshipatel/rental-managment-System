const express = require('express')
const router = new express.Router()
const State = require('../models/state')
const adminAuth = require('../../db/middleware/admin_auth')


router.post('/state',async (req,res)=>{
    const state = new State({
        ...req.body,
    })
    try{
        await state.save()
        res.status(201).send(state)
    }
    catch(e){
        res.status(400).send({message : "This feild Should be Unique!!"})
    }
    
   });



router.get('/state',async (req,res)=>{
  
    try{
       
        const state = await State.find({isDeleted:false})
        if(!state){
            res.status(500).send() 
         }
         res.send(state)
    }
    catch(e){
        res.status(500).send()
    }
});

router.get('/state_count',async (req,res)=>{
  
    try{
       
        const state_count = await State.find({isDeleted:false}).count()
       
        res.json({state_count})
    }
    catch(e){
        res.status(500).send()
    }
});


router.get('/state/:id',async (req,res)=>{
    const _id = req.params.id 
    //  try{
        
         const state = await State.find({_id})
         if(!state){
             res.status(500).send() 
          }
          res.send({state: state[0]})
    // }
    //  catch(e){
    //      res.status(500).send()
    //  }
 });



router.put('/state/edit/:id',async (req ,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['stateName']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try{
        const state = await State.findOne({_id : req.params.id})
        
        
        if(!state){
            return res.status(500).send()
        }
        updates.forEach((update)=>state[update]=req.body[update])
        await state.save();

        res.send(state)
    }catch(e){
        return res.status(500).send({errorMessage:"This feild is Unique!!"});
    }
})


router.delete('/state/delete/:id',async (req,res)=>{
    try{
        //const task = await Task.findByIdAndDelete(req.params.id)
        const state = await State.findOneAndUpdate({_id: req.params.id },
            {
                isDeleted:true
            },{
                new:true
            })
        if(!state){
            return res.status(500).send()
        }
        res.send(state)
    }catch(e){
        res.status(500).send()
    }
})

module.exports=router