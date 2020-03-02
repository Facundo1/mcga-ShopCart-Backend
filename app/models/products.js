const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    _id: {
      type: Number,
      required: true
    },
    photo: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    availableSize: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { versionKey: false }
);

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;
