const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render('index',{files:files})
    }) 
})

app.post('/create', (req,res)=>{
  const {title,description} = req.body
  try {
    fs.writeFile(`./files/${title.split(' ').join('')}.txt`, description,function(err){
        res.redirect('/')
    });
    
  } catch (err) {
    console.error(err);
  }
})

app.listen(PORT,()=>{
    console.log("server is running")
})