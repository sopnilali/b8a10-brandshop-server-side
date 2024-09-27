const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connectDB');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;

const authenticationRoutes = require("./routes/authentication/index");
const applyMiddleware = require('./middleware/applyMidleware');
const ProductsRoutes = require('./routes/Products')
const BrandsRoutes = require('./routes/Brands/');
const ProductSliderRoutes = require('./routes/ProductSliders')
const MyCartRoutes = require('./routes/MyCarts');
const JWTRoutes = require('./routes/Jwt')
const ReviewRoutes = require('./routes/Reviews')

app.use(cors({
    origin: [`${process.env.LOCAL_URL}`, `${process.env.CLIENT}`],
    credentials: true,
}));

applyMiddleware(app);

app.use(authenticationRoutes);
app.use(ProductsRoutes);
app.use(BrandsRoutes);
app.use(ProductSliderRoutes);
app.use(MyCartRoutes);
app.use(JWTRoutes);
app.use(ReviewRoutes);

app.get('/', (req, res, next) => {
    res.send('Hello World!')
});


app.all('*', (req, res, next) => {
    const error = new Error(` The requested url is invalid [${req.url}]`)
    error.status = 404
    next(error)

})

// error handling middleware

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        message: err.message,
        error: req.app.get('env') === 'development'? err : {
            message: err.message
        }
    })
 
})

// server start

// In a real-world application, you would likely have database connections, routes, and middleware set up here. However, for the sake of this example, we are just sending a simple "Hello World!" response.

const main = async ()=> {
    await connectDB();
    app.listen(port, ()=> {
        console.log(`Mobile web app server on port ${port}`);
    })
}

main();


