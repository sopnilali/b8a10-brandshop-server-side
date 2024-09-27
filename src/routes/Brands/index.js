var express = require('express');
const Brands = require('../../models/Brands');
var router = express.Router();

  // find all products from database
  router.get('/brands', async(req, res) => {
    const cursor = await Brands.find( )
    res.send(cursor);
})

    //insert brands
    router.post('/brands', async(req, res) => {
        const brand = req.body;
        const result = await Brands.create(brand);
        console.log(result);
        res.send(result);
  
    })


module.exports = router;