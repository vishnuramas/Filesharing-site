const router = require('express').Router();
const multer = require("multer");
const path = require('path') //To get the file extension 
const File = require('../models/file');
const {v4: uuid4} = require('uuid');

let storage = multer.diskStorage({
    destination:(req,file,cb)=> cb(null,'uploads/'),
    filename: (req,file,cb) => {
        const uniquename = `${Date.now()}=${Math.round(Math.random() *1E9)}${path.extname(file.originalname)}`;
        cb(null,uniquename);
    }
})

let upload = multer({
    storage,
    limit:{fileSize:100000*100},
}).single('myfile')

router.post('/',(req,res)=>{
    //validate requrest
    
    //Store the data locally
        upload(req,res,async(err)=>{
            if(!req.file){
                return res.json({error: "All fields are required"});
            }
            if(err){
                return res.status(500).send({error: err.message})
            }
            const file = new File({
                filename:req.file.filename,
                uuid:uuid4(),
                path:req.file.path,
                size:req.file.size
            })
            const response = await file.save();
            return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`})
        })


    //Store in database



    //Response 
})












module.exports = router;