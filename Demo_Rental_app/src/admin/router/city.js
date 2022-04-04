const express = require('express')
const router = new express.Router()
const City = require('../models/city')
const multer = require('multer');
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/city-images");
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



router.post('/city',upload.array("images", 3),async (req,res)=>{
    const city = new City({
        ...req.body,
        images: req.files
    })
    try{
        await city.save()
        res.status(201).send(city)
    }
    catch(e){
        res.status(400).send(e)
    }
    
   });




 router.get('/city',async (req,res)=>{

  try{
   
     const city = await City.find({isDeleted:false}).populate("state");
    
      if(!city){
          res.status(500).send() 
       }

       res.send(city)
      
  }
  catch(e){
      res.status(500).send({message:"No Data Found!!"})
  }
});
 

router.get('/city/page',async (req,res)=>{

    try{
       const limit = 5;
       const skip = (req.query.page - 1) * limit;
       const city = await City.find({isDeleted:false}).populate("state").skip(skip).limit(limit);
       const city_count = await City.find({isDeleted:false}).populate("state").count();
        if(!city){
            res.status(500).send() 
         }

         res.send({city:city,city_count:city_count})
        
    }
    catch(e){
        res.status(500).send({message:"No Data Found!!"})
    }
});




router.get('/city_count',async (req,res)=>{
  try{
    const city_count = await City.find({isDeleted:false}).count();
    res.json({city_count})
  
 }catch(e){
  res.status(500).send({message :"No data Found !!!"})
 }
  
});

router.get('/city/:id',async (req,res)=>{
  const _id = req.params.id 
  try{
      
       const city = await City.find({_id})
       if(!city){
           res.status(500).send() 
        }
        res.send({city: city[0]})
  }
   catch(e){
       res.status(500).send({message:"you entered Something Wrong!!"})
   }
});

router.put('/city/edit/:id',upload.array("images", 3),async (req ,res)=>{
  

    const data = {
        ...req.body,
    

        }
        console.log(req.files)
        if (req.files.length) {
        const image = req.files
        data.images = image
        }
        
        try {
        const city = await City.findByIdAndUpdate({_id : req.params.id}, {
        $set : data
        },{
        new: true
        }
        );
        
        await city.save();
        res.send(city);
        } catch (e) {
        res.status(500).send({ error: e })
        }
})


router.delete('/city/delete/:id',async (req,res)=>{
    try{

        const city = await City.findOneAndUpdate({_id: req.params.id },
            {
                isDeleted:true
            },{
                new:true
            })
        if(!city){
            return res.status(500).send()
        }
        
        res.send(city)
    }catch(e){
        res.status(500).send({message :"No data Found !!!"})
    }
})


router.get('/statebyCity/:id',async (req,res)=>{
  const _id = req.params.id 
   try{
    
       const city = await City.find({state: _id ,isDeleted:false})
       if(!city){
           res.status(500).send() 
        }
        res.send(city)
  }
   catch(e){
       res.status(500).send({message: "No Data Found!!"})
   }
});

module.exports=router