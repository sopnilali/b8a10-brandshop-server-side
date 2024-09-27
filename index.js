// const os=require("os")
// os.hostname=()=>"localhost"

// const express = require('express');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser')
// const app = express();
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const cors = require('cors');
// const port = process.env.PORT || 3000;

// //dot environment config
// require('dotenv').config()

// // middleware 
// app.use(cors({
//   origin: [
//   `${process.env.LOCAL_URL}`,
//   `${process.env.CLIENT}`,
// ],
//   credentials:true
// }));
// app.use(express.json());
// app.use(cookieParser())



// // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.35itrev.mongodb.net/?retryWrites=true&w=majority`;

// // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   }
// // });
// // // middlewares

// // const logger = (req, res, next) => {
// //   console.log('login info', req.method, req.url);
// //   next();
// // }



// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect();

//     const productCollection = client.db("mobileDB").collection("products");
//     const brandCollection = client.db("mobileDB").collection("brands");
//     const productSlideCollection = client.db("mobileDB").collection("sliders");
//     const cartCollection = client.db("mobileDB").collection("carts");
//     const reviewCollection = client.db("mobileDB").collection("reviews");

//     app.get('/', (req, res) => {
//         res.send("Welcome to my mobile web app");
//     });

//   //mobile-reviews part

//   // find all mobile-reviews from database
//       app.get('/reviews', async(req, res) => {
//         const cursor = reviewCollection.find()
//         const result = await cursor.toArray();
//         res.send(result)
//     })

//         //insert mobile-reviews to database
//         app.post('/reviews', async(req, res) => {
//           const review = req.body;
//           const result = await reviewCollection.insertOne(review);
//           console.log(result);
//           res.send(result);
//       })

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.listen(port, ()=> {
//     console.log(`Mobile web app server on port ${port}`);
// })