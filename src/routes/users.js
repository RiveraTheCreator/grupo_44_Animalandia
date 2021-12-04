const express = require('express');
const router = express.Router();
const path = require('path');
const multer =  require('multer');
const model = require('../models/Users')
const usersController = require(path.join(__dirname,'../controllers/usersController.js'));
const {body} =  require('express-validator');
//Express-Validator
let validaciones = [
    body('email').notEmpty().withMessage('Ingresa un correo').bail().isEmail().withMessage('Inserta un email valido'),
    body('firstName').notEmpty().withMessage('Inserta un nombre'), 
    body('lastName').notEmpty().withMessage('Inserta un nombre'),
    body('password').notEmpty().withMessage('Introduce una contraseña'),//.bail().isStrongPassword().withMessage('El password debera incluir 8 caracteres con Mayusculas minusculas y caracteres alfanumericos'),
    body('phone').notEmpty().withMessage('Introduce tu numero'),//.bail().isNumeric().withMessage('Ingresa un numero valido'),
    body('streetNumber').notEmpty().withMessage('No puedes dejar el campo vacio'),
    body('postalCode').notEmpty().withMessage('Ingresa un CP'),
    body('country').notEmpty().withMessage('No puedes dejar el campo vacio'),
    body('confirmPass').notEmpty().withMessage('Llenar ambos campos')
];

//Se configura multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../public/images/users'));
    },
    filename: (req,file,cb)=> {
        let fileName = `img_${Date.now()}${path.extname(file.originalname)}`;
        cb(null,fileName);
        file?model.catchName(fileName):undefined;
    }
})
//Se declara el midleWare
const uploadFile = multer({storage});

//Vista de login & validacion por post
router.get('/login',usersController.login);
router.post('/login',usersController.loginProcess);


//Vista de login & validacion por post
router.get('/registrar',usersController.registrar);
router.post('/registrar',uploadFile.single('picture'),validaciones,usersController.processRegister);

router.get('/usuarioPerfil',usersController.sendProfile);
module.exports = router;