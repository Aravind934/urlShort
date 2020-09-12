const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs')
const {myUrl} =require('./urlDb/schemas');
require('dotenv').config();
 var app = express();
//middles
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.set('view engine','ejs');  

 //main
app.get('/',(req,res)=>{
    myUrl.find((err,result)=>{
        if(err) throw err;
        res.render('home',{
          url:result
        });
    })
   
});
app.get('/:urlId',(req,res)=>{
    myUrl.findOne({shorturl:req.params.urlId},(err,data)=>{
        if(err) throw err;
        myUrl.findByIdAndUpdate({_id:data.id},{$inc:{clickcount:1}},(err)=>{
            if(err) throw err;
            res.redirect(data.longurl);
        })
        
    })
    });

    app.get('/delete/:id',(req,res)=>{
        myUrl.findByIdAndDelete({_id:req.params.id},(err)=>{
            if(err) throw err;
            res.redirect('/');
        })
    })

 app.post('/create',(req,res)=>{
               
       newUrl  = new myUrl({
           longurl:req.body.longurl,
           shorturl: makeUrl(4)
       }) 
       newUrl.save((err,result)=>{
           if(err) throw err;
           res.redirect('/');
       })
     
 })

 function makeUrl(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 app.listen(3000,()=>{
     console.log('app in 3000')
 });
 mongoose.set('useNewUrlParser',true);
 mongoose.set('useUnifiedTopology', true);
 mongoose.connect(process.env.PATH_NAME1,()=>{
     console.log('db ok!');
 })