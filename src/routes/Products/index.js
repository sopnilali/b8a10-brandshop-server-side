var express = require('express');
const Products = require('../../models/Products');
var router = express.Router();

  // find all products from database
  router.get('/products', async(req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = 'createdAt';
    const order = 'asc'
    const sortOrder = order === 'desc' ? -1 : 1;
    const cursor = await Products.find( ).sort({ [sortBy]: sortOrder })

    // Calculate the starting and ending index for pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // Slice the products array to get the current page of products
    const paginatedProducts = cursor.slice(startIndex, endIndex);

    
    
    res.json({
      products: paginatedProducts,
      currentPage: page,
      totalPages: Math.ceil(cursor.length / limit),
      totalProducts: cursor.length,
    });
})

    //insert products
    router.post('/products', async(req, res) => {
        const product = req.body;
        const result = await Products.create(product)
        console.log(result);
        res.send(result);
    })
    
        // find single product from database
        router.get("/single-product/:id", async (req, res) => {
            const id = req.params.id;
            const result = await Products.findOne({_id: id});
            console.log(result);
            res.send(result);
          });

        router.get('/brand-products/:bname', async (req, res) => {
            const brandName = req.params.bname;
            const result = await Products.find({brandName: brandName});
            console.log(result);
            res.send(result);
          });
      
          // update user data with new data from mongodb database
          router.put('/single-product/:id', async(req, res) => {
                  const id = req.params.id;
                  const updateProduct = req.body
                  console.log(updateProduct);
                  const filter = {_id: id};
                  const options = { upsert: true };
                  const updateDoc = {
                    $set: {
                      productName: updateProduct.productName,
                      brandName: updateProduct.brandName,
                      types: updateProduct.types,
                      price: updateProduct.price,
                      purl: updateProduct.purl,
                      rating: updateProduct.rating,
                      shortDes: updateProduct.shortDes,
                    }
                  }
                  const result = await Products.updateOne(filter, updateDoc, options)
                  res.send(result)
                })


module.exports = router;