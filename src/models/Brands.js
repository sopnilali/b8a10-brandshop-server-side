const { Schema, model } = require('mongoose')


const BrandSchema = new Schema({
    brandName: { 
        type: String, 
    },
    purl: { 
        type: String, 
    }
})

const Brands = model('brands', BrandSchema);

module.exports = Brands;