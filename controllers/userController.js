const con = require('../config.js');
const bcrypt = require('bcryptjs');
var jsonwt = require('jsonwebtoken');

module.exports = {

    index:function(req,res){
        res.render("home.ejs");
    },
    login:function(req,res){
        res.render("login.ejs"); 
    },
    postRegister:(req, res)=> {
        
        let sql = `SELECT * from register WHERE email = '${req.body.email}'`;
        
        con.query(sql, async (err, result) => {
           console.log("sql",sql);
            console.log("result",result);
            if(err)
            {
                 console.log(err);
            }
            else if(result.length > 0)
            { 
                res.json({error:"Email already exists"});
            }
            else {
        const email = req.body.email;
        const password = req.body.password;
        const salt = 10;
        const encryptedPass = await bcrypt.hash(password,salt);
        const insertQuery = `INSERT into register SET email = '${email}',password='${encryptedPass}'`;
        con.query(insertQuery, (err, result) => {
            console.log("insertQuery",insertQuery);;
            if (err)
                console.log(err);
            else {
                res.status(200).json({message:"Registered successfully"});
            }
        })     
        }

        })
       
    },
    postlogin:(req,res)=>{
        let email = req.body.email;
        let password = req.body.password;
       req.session.email = email
        console.log('session data',req.session.email);
        const selectLogin = `SELECT * FROM register WHERE email = '${email}'`;
        con.query(selectLogin, async(err, result) => {
            const compared = await bcrypt.compare(password,result[0].password);
            if(compared)
            {
                let user = {
                    id:result[0].id,
                    email:result[0].email,
                }
                const jwt = jsonwt.sign({user:user},process.env.SECRET_KEY,{expiresIn:'1h'});
                
                res.cookie('token',jwt);
                res.json({message:'Logged in successfully',token:jwt}
                );
                               
            }
            else {
                return res.status(200).json({error:"Invalid credentials"});
            }
        })
    },
    uploadFile:(req,res)=>{
        let sql = `SELECT * FROM files`;
        con.query(sql,(err,result)=>{
            if(err)
            console.log(err);
            else{
                res.render('upload.ejs',{data:result});
            }
        })
       

    },
    fileUpload:(req,res)=>{
        let file = req.file.filename;
        console.log('file',file);
        let filePath = '/uploads/'+file;
        console.log("filewpath",filePath);
       
        let sql = `INSERT INTO files SET image_url = '${filePath}'`;
        con.query(sql,(err,result)=>{
            if(err) console.log(err);
            else{
                res.redirect('/uploadFile');
            }
        })
    },

}