var express = require('express');
const MyCarts = require('../../models/MyCarts');
const { createCookieToken } = require('../../api/authentication/controllers');
var router = express.Router();



  //jwt token 

  router.post('/jwt', createCookieToken)

module.exports = router