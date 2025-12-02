import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import sequelize,{dbConnection_init} from './db/connection.js'
import {Users,Blogs} from './models/associations.js'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'

configDotenv()

const app = express()
const PORT = '8000'

app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    filename: function (req,file,cb){
        return cb(null, Date.now()+`-`+file.originalname)
    },
    destination:function (req,file,cb){
        let dir = path.join('media',`${req.body.username}`,'profile_pictures')
        fs.mkdirSync(dir,{ recursive: true })
        return cb(null,`./media/${req.body.username}/profile_pictures`)
    }
})

const upload = multer({storage})


app.post('/register',upload.single("profile_picture"),async(req,res)=>{
    console.log("inside register");
    console.log(req.file,"req.file")
    let profile_picture = null
    if (req.file){
        profile_picture = req.file.path
    }
    const {username, email,password} = req.body;
    const obj = await Users.findAll({where:{username,email,password}})
    
    if (obj.length>0){ 
        res.status(409).json({message:"user exists."})
    }
    else{ 
        const user = await Users.create({username,email,password,profile_picture}); 
        console.log(user.dataValues,"USER")
        const token = jwt.sign({id:user.id,username:user.username},process.env.JWTKEY,)
        res.status(201).json({success:true,user:user.dataValues,token:token})
}
    
})


const startserver = async() =>{
    try{
        await dbConnection_init(sequelize)
        app.listen(PORT,()=>{console.log(`\nApp running on port : ${PORT}`)})
    }catch(e){
        console.log(e);
        
    }
}

startserver();






