var express = require('express');
const MyCarts = require('../../models/MyCarts');
var router = express.Router();

      // find all carts from database
      router.get('/mycarts', async (req, res) => {
        const result = await MyCarts.find()
        res.send(result)
    })

    // //insert carts to database
    router.post('/mycarts', async(req, res) => {
        const product = req.body;
        const result = await MyCarts.create(product);
        console.log(result);
        res.send(result);
    })
  
    // find cart with user Id base from database
    router.get("/mycarts/:userId", async (req, res) => {
        const userID = req.params.userId;
        console.log('cook cookies',req.cookies);
        const query = {userID};
        const result = await MyCarts.find(query)
        console.log(result);
         res.send(result);   
    });


    // // delete cart item from database
    router.delete('/mycarts/:id', async(req, res) => {
      const id = req.params.id;
      const result = await MyCarts.deleteOne({_id:id});
      console.log(result);
      res.send(result);
    });
module.exports = router