const { Schema, model } = require('mongoose')


const ProductSliderSchema = new Schema({
    brandName: { 
        type: String, 
    },
    ads_img: { 
        type: String, 
    },
})

const ProductSliders = model('sliders', ProductSliderSchema);

module.exports = ProductSliders;