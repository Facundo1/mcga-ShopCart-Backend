const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    _id: {
        type: Number
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    }
},{versionKey: false})

const Product = mongoose.model('products',ProductSchema)

module.exports = Product