const { Schema, model } = require('mongoose')


const ReviewsSchema = new Schema({
    brandName: { 
        type: String, 
    },
    ads_img: { 
        type: String, 
    },
})

const Reviews = model('reviews', ReviewsSchema);

module.exports = Reviews;