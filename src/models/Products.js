const { Schema, model } = require('mongoose')


const ProductsSchema = new Schema({
    productName: { 
        type: String, 
    },
    brandName: { 
        type: String, 
    },
    types: { 
        type: String, 
    },
    price: { 
        type: String, 
    },
    purl: { 
        type: String,
    },
    rating: { 
        type: String, 
     },
    shortDes: { 
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

const Products = model('products', ProductsSchema);

module.exports = Products;