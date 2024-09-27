const { Schema, model } = require('mongoose')


const MyCartSchema = new Schema({
    productName: { 
        type: String, 
    },
    brandName: { 
        type: String, 
    },
    price: { 
        type: String, 
    },
    productImage: { 
        type: String,
    },
    productID: { 
        type: String, 
     },
     userID: { 
        type: String,
    }
})

const MyCarts = model('carts', MyCartSchema);

module.exports = MyCarts;