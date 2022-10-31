require("dotenv").config();
require("./src/database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const imagekit = require("imagekit");
// const bodyParser = require("body-parser");

const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors())
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
/**
 * all the api gateway should be here
 */
const User = require("./models/User");
app.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    console.log(req.body);
    if (!(email && password && first_name && last_name)) {
     return res.status(400).json({
        error:"All input is required"});
    }
    const checkUser = await User.findOne({ where:{email:email} });
    console.log(checkUser);
    if (checkUser) {
      return res.status(400).json({error:"User Already Exist. Please Login."});
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    /** Generate token */
    const token = jwt.sign({ user_id: user.id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    user.token = token;
    res.status(201).json({token});
    
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.post('/signin',async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!(email && password)){
            return res.status(200).json({error:'All input is required.'});
        }
        const checkUser = await User.findOne({ where:{email:email} });
    if(!checkUser){
      return res.status(200).json({error:'Invalid email or password'});
    }
    const isSamePassword = await bcrypt.compare(password,checkUser.password);
    console.log(isSamePassword);
    if (checkUser&&(await bcrypt.compare(password,checkUser.password))) {
        
        const token = jwt.sign(
            { user_id: checkUser._id, email },
            process.env.SECRET_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          checkUser.token = token;
    
          // user
        return  res.status(200).json({token});
    }
    res.status(200).json({error:"Invalid Credentials."});

    }catch(err){
        console.log(err);
    }
});

/** importing middleware   */
const auth = require("./middleware/auth");
const Contact = require("./models/Contact");

app.get('/contacts',auth,async(req,res)=>{
  try{
    const contacts = await Contact.findAll({
      order:[
        ['is_favourite','desc']
      ]
    });
    res.status(200).json({contacts});
  }catch(err){
    console.log(err);
  }
});

app.post('/contacts',auth,async(req,res)=>{
  try{
    const data = req.body;
    if(!(data.name && data.phone && data.photograph)){
      return res.status(500).json({error:'All field are required.'});
    }
    const checkPhone = await Contact.findOne({where:{phone:data.phone}});
    console.log(checkPhone);
    if(checkPhone){
      return res.status(500).json({error:'Phone number already exist.'});
    }
    /** need to add photo upload and resize logic here */

    const contact = await Contact.create({
      name:data.name,
      phone:data.phone,
      photograph:data.photograph,
      email:data.email,
    });
    res.status(200).json({contact});
  }catch(err){
    console.log(err);
  }
});

app.get('/contact/:contact_id',auth,async(req,res)=>{
  try{
    const contactId = req.params.contact_id;
    if(!contactId){
      return res.status(500).json({error:'Contact Id is required.'});
    }
    
    const contact = await Contact.findOne({where:{id:contactId}});

    if(!contact){
      return res.status(500).json({error:'No contact found.'});
    }
    res.status(200).json({contact:contact});
  }catch(err){
    console.log(err);
  }
});

app.put('/contacts/:contact_id',auth,async(req,res)=>{
  try{
    const contactId = req.params.contact_id;
    if(!contactId){
      return res.status(500).json({error:'Contact Id is required.'});
    }
    const data = req.body;
    if(!(data.name && data.phone && data.photograph)){
      return res.status(500).json({error:'All field are required.'});
    }
    const contact = await Contact.findOne({where:{id:contactId}});

    if(!contact){
      return res.status(500).json({error:'No contact found.'});
    }
    console.log(contact);
    await contact.update({
      name:data.name,
      phone:data.phone,
      photograph:data.photograph,
      updatedAt:data.updatedAt,
    })
    res.status(200).json(contact);
  }catch(err){
    console.log(err);
  }
});

app.delete('/contacts/:contact_id',auth,async(req,res)=>{
  try{
    const contactId = req.params.contact_id;
    if(!contactId){
      return res.status(500).json({error:'Contact Id is required.'});
    }
    const contact = Contact.findOne({where:{id:contactId}});
    if(!contact){
     
      return res.status(500).json({error:'No contact found.'});
    }
   await Contact.destroy({
      where:{id:contactId}
    })
    res.status(200).json({status:200});
  }catch(err){
    console.log(err);
  }
});

app.put('/mark-contact-favourite/:contact_id',auth,async(req,res)=>{
  try{
    const contactId = req.params.contact_id;
    if(!contactId){
      return res.status(500).json({error:'Contact Id is required.'});
    }
    
    const contact = await Contact.findOne({where:{id:contactId}});

    if(!contact){
      return res.status(500).json({error:'No contact found.'});
    }
  
    const is_favourite = contact.is_favourite==true?false:true;
    
    await contact.update({
      is_favourite:is_favourite
    });

    res.status(200).json(contact);
  }catch(err){
    console.log(err);
  }
});

module.exports = app;
