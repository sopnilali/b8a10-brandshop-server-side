var express = require('express');
const ProductSliders = require('../../models/ProductSliders');
var router = express.Router();


    //find all slider products from database
    router.get('/product-sliders', async(req, res) => {
        const result = await ProductSliders.find()
        console.log(result);
        res.send(result);
  })

      
      // find brand name slider from database
      router.get("/brand-sliders/:bname", async (req, res) => {
        const brandName = req.params.bname;
        const result = await ProductSliders.find({brandName: brandName});
        // console.log(result);
        res.send(result);
      });

  
    // //insert product slider
    router.post('/product-sliders', async(req, res) => {
        const product = req.body;
        console.log(product);
        const result = await ProductSliders.create(product);
        console.log(result);
        res.send(result);
  
    })


  




module.exports = router;