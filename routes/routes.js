const express = require('express');
const router = express.Router();
const multer = require('multer')
const {checkIfAuthorized} = require('../auth/middleware.js');;
const storageEngine = multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,'public/uploads/');
        },
        filename:(req,file,cb)=>{
            cb(null,file.originalname);
        }
    }
)
const upload = multer({storage:storageEngine,limits: {
    fileSize: 500000 // 500000 Bytes = 500 KB
  },});

const {index,login,postlogin,postRegister,uploadFile,fileUpload} = require('../controllers/userController.js');
router.get('/',index);
router.post('/register', postRegister);
router.get('/login',login);
router.post('/postLogin',postlogin);
router.get('/uploadFile',checkIfAuthorized,uploadFile);
router.post('/fileUpload',checkIfAuthorized,upload.single('image'),fileUpload);

module.exports = router;