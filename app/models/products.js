const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    _id: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    availableSize: {
        type: String
    },
    price: {
        type: Number
    },
    isFreeShipping: {
        type: Boolean
    }
},{versionKey: false})

const Product = mongoose.model('products',ProductSchema)

module.exports = Product