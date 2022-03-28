const express = require('express')
const router = new express.Router()
const Property = require('../models/property')
const auth = require('../db/middleware/auth');
const multer = require('multer');
const path = require('path');




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/property-images");
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



router.post('/property',auth,upload.array("images", 8),async (req,res)=>{
 
    const pro = new Property({
        ...req.body,
        images: req.files,
        owner : req.user._id,
       
    })
    try{
        await pro.save()
        res.status(201).send({msg:"Data Added Successfully!!!"})
    }
    catch(e){
        res.status(400).send({msg:"Please Provide All Details!!"})
    }
    
   });


router.get('/property/me',auth,async (req,res)=>{
 
 try{
   
     const pro = await Property.find({ owner:req.user._id, isDeleted:false}).populate("city").populate("state")
     if(!pro){
         res.status(500).send() 
      }
      res.send(pro)
 }
 catch(e){
     res.status(500).send()
 }
}); 

router.get('/property/all/list',auth,async (req,res)=>{
 
    try{
      
        const pro = await Property.find( { owner: { "$ne": req.user._id } }).populate("owner").populate("city").populate("state")
        if(!pro){
            res.status(500).send() 
         }
         res.send(pro)
    }
    catch(e){
        res.status(500).send()
    }
   }); 


router.get('/property/List',auth ,async (req,res)=>{

     try{
        const limit = 5;
        const skip = (req.query.page - 1) * limit;
        const sort={};
       
        if(req.query.sort){
            const order = +req.query.asc
           
             const part=req.query.sort.split(':');
 
            sort[part[1]]= order===1 ? 1 : -1
            
         }

         const pro = await Property.find( { owner: { "$ne": req.user._id } }).populate("owner").populate("city").populate("state").sort(sort)
        .skip(skip).limit(limit);

        const pro_count = await Property.find( { owner: { "$ne": req.user._id } }).populate("owner").populate("city").populate("state").sort(sort).count(); 

        if(!pro){
            res.status(500).send() 
         }
         res.json({pro: pro,pro_total : pro_count})
       
    }
    catch(e){
        res.status(500).send()
    }
   }); 


router.get('/property/all',async (req,res)=>{

    try{
       
        const pro = await Property.find({isDeleted:false}).populate("city").populate("state").populate("owner");
      
        if(!pro){
            res.status(500).send() 
         }
         res.send(pro)
    }
    catch(e){
        res.status(500).send()
    }
   }); 

   router.get('/property/users/all',async (req,res)=>{

    try{
       
        const pro = await Property.find({isDeleted:false}).populate("city").populate("state").populate("owner").limit(6);
      
        if(!pro){
            res.status(500).send() 
         }
         res.send(pro)
    }
    catch(e){
        res.status(500).send()
    }
   }); 

router.get('/property/:id',auth,async (req,res)=>{
    const _id = req.params.id 
     try{
        
         const pro = await Property.find({_id,isDeleted:false}).populate("city").populate("state").populate("owner")
         
         if(!pro){
             res.status(500).send() 
          }
          res.send({pro:pro[0]})
         
    }
     catch(e){
         res.status(500).send({message: "no data found!!"})
     }
 });



 router.get('/property_count',async (req,res)=>{
    try{
         const pro_count = await Property.find({isDeleted:false}).count();
         res.json({pro_count})
        }
     catch(e){
         res.status(500).send(e)
     }
 });


router.put('/property/edit/:id',auth ,upload.array("images", 8),async (req ,res)=>{


    const data = {
        ...req.body,
        owner : req.user._id,

        }
      
        if (req.files.length) {
        const image = req.files
        data.images = image
        }
        
        try {
        const pro = await Property.findByIdAndUpdate({_id : req.params.id}, {
        $set : data
        },{
        new: true
        }
        );
        
        await pro.save();
        res.send(pro);
        } catch (e) {
        res.status(500).send({ errMessage: "Plaese provide valid data!" })
        }


})


router.delete('/proprty/delete/:id',async (req,res)=>{
    try{
     
        const pro = await Property.findOneAndUpdate({_id: req.params.id },
            {
                isDeleted:true
            },{
                new:true
            })
        if(!pro){
            return res.status(500).send()
        }
        res.send(pro)
    }catch(e){
        res.status(500).send()
    }
})



router.get('/propertybycity/:id',auth,async (req,res)=>{
    const _id = req.params.id 
     try{
        
        const limit = 5;
        const skip = (req.query.page - 1) * limit;
        const sort={};
       
        if(req.query.sort){
            const order = +req.query.asc
           
             const part=req.query.sort.split(':');
      
            sort[part[1]]= order===1 ? 1 : -1
            
         }
         const pro = await Property.find({city: _id , owner: { "$ne": req.user._id }}).sort(sort)
         .skip(skip).limit(limit);
        
         const pro_count = await Property.find({city: _id , owner: { "$ne": req.user._id }}).sort(sort)
         .skip(skip).limit(limit).count()

         if(!pro){
             res.status(500).send() 
          }
          res.json({pro: pro,pro_total : pro_count})
    }
     catch(e){
         res.status(500).send({message: "No Data Found!!"})
     }
 });


 router.get('/propertybycity/:id',auth,async (req,res)=>{
    const _id = req.params.id 
     try{
        
        const limit = 5;
        const skip = (req.query.page - 1) * limit;
      
         const pro = await Property.find({city: _id , owner: { "$ne": req.user._id }})
         .skip(skip).limit(limit);
        
         const pro_count = await Property.find({city: _id, owner: { "$ne": req.user._id }})
         .skip(skip).limit(limit).count()

         if(!pro){
             res.status(500).send() 
          }
          res.json({pro: pro,pro_total : pro_count})
    }
     catch(e){
         res.status(500).send({message: "No Data Found!!"})
     }
 });



module.exports=router