const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
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