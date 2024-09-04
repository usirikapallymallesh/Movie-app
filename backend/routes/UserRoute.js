const express = require('express');
const {Register,Login,Logout}=require('../controllers/User.js');

const router=express.Router();

router.route('/register').post(Register);
router.post('/login',Login);
router.get('/logout',Logout);

module.exports=router;