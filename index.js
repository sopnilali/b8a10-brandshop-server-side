const os=require("os")
os.hostname=()=>"localhost"

const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;

//dot environment config
require('dotenv').config()

const corsConfig = {
  origin:'',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}
// middlewars
app.use(cors());
app.options("", cors(corsConfig))
app.use(express.json());
app.use(cookieParser())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.35itrev.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// middlewares

const logger = (req, res, next) => {
  console.log('login info', req.method, req.url);
  next();
}

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token
  // console.log('token in the middleware',token);
  // no token available
  if(!token){
    return res.status(401).send({message: 'unauthorized access'})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err) {
      return res.status(401).send({message: 'unauthorized access'})
    }
    req.user = decoded;
    next();
  })
}

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productCollection = client.db("mobileDB").collection("products");
    const brandCollection = client.db("mobileDB").collection("brands");
    const productSlideCollection = client.db("mobileDB").collection("sliders");
    const cartCollection = client.db("mobileDB").collection("carts");
    const reviewCollection = client.db("mobileDB").collection("reviews");

    app.get('/', (req, res) => {
        res.send("Welcome to my mobile web app!");
    });

    //auth related api

    app.post('/jwt', async (req, res) => {
      const user = req.body;
      console.log('user for token',user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:'1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })
    .send({success: true});
    })

    app.post('/logout', async (req, res) => {
      const user = req.body;
      console.log('logout user', user);
      res.clearCookie('token', {maxAge:0}).send({success: true});
    })

    //services related api

    // find all products from database
        app.get('/products', async(req, res) => {
          const cursor = productCollection.find( )
          const result = await cursor.toArray();
          res.send(result);
    })
  
    //insert products
    app.post('/products', async(req, res) => {
        const product = req.body;
        const result = await productCollection.insertOne(product);
        console.log(result);
        res.send(result);
    })

    // find single product from database
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await productCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    // update user data with new data from mongodb database
    app.put('/product/:id', async(req, res) => {
            const id = req.params.id;
            const updateProduct = req.body
            console.log(updateProduct);
            const filter = {_id: new ObjectId(id)};
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
            const result = await productCollection.updateOne(filter, updateDoc, options)
            res.send(result)
          })
    
    // find single products from database
    app.get("/products/:bname",  async (req, res) => {
      const brandName = req.params.bname;
      const query = {brandName};
      const cursor = productCollection.find(query)
      const result = await cursor.toArray();
      res.send(result);
    });


    //insert brands
    app.post('/brands', async(req, res) => {
      const brand = req.body;
      console.log(brand);
      const result = await brandCollection.insertOne(brand);
      console.log(result);
      res.send(result);

  })

  // find all brands from database
  app.get('/brands',  async(req, res) => {
    const cursor = brandCollection.find()
    const result = await cursor.toArray();
    res.send(result)
})

//product slider site

    //find all slider products from database
    app.get('/product-sliders', async(req, res) => {
      const cursor = productSlideCollection.find()
      const result = await cursor.toArray();
      res.send(result)
})

  //insert product slider
    app.post('/product-sliders', async(req, res) => {
      const product = req.body;
      console.log(product);
      const result = await productSlideCollection.insertOne(product);
      console.log(result);
      res.send(result);

  })

      // find brand name slider from database
      app.get("/product-sliders/:bname", async (req, res) => {
        const brandName = req.params.bname;
        const query = {brandName};
        const cursor = productSlideCollection.find(query)
        const result = await cursor.toArray();
        res.send(result);
      });

    //insert carts to database
    app.post('/mycarts', async(req, res) => {
      const product = req.body;
      const result = await cartCollection.insertOne(product);
      console.log(result);
      res.send(result);
  })

        // find cart with user Id base from database
        app.get("/mycarts/:userId", logger, verifyToken, async (req, res) => {
          const userID = req.params.userId;
          console.log('cook cookies',req.cookies);
          const query = {userID};
          const cursor = cartCollection.find(query)
          const result = await cursor.toArray();
          res.send(result);
        });

    // find all carts from database
    app.get('/mycarts', verifyToken, async (req, res) => {
      const cursor = cartCollection.find()
      const result = await cursor.toArray();
      res.send(result)
  })

  // delete cart item from database
  app.delete('/mycarts/:id', async(req, res) => {
    const id = req.params.id;
    const query = {
      _id: new ObjectId(id),
    };
    const result = await cartCollection.deleteOne(query);
    console.log(result);
    res.send(result);
  });

  //mobile-reviews part

  // find all mobile-reviews from database
      app.get('/reviews', async(req, res) => {
        const cursor = reviewCollection.find()
        const result = await cursor.toArray();
        res.send(result)
    })

        //insert mobile-reviews to database
        app.post('/reviews', async(req, res) => {
          const review = req.body;
          const result = await reviewCollection.insertOne(review);
          console.log(result);
          res.send(result);
      })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, ()=> {
    console.log(`Mobile web app server on port ${port}`);
})