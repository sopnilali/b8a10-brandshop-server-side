var express = require('express');
const Reviews = require('../../models/Reviews');
var router = express.Router();

  
  
  
  // find all mobile-reviews from database
  router.get('/reviews', async(req, res) => {
    const result = await Reviews.find()
    res.send(result)
})

    //insert mobile-reviews to database
    router.post('/reviews', async(req, res) => {
      const review = req.body;
      const result = await Reviews.create(review);
      console.log(result);
      res.send(result);
  })

module.exports = router;