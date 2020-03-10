const Product = require('../../models/products')

const getAll = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) res.send({ msg: 'can`t get the user list', error: err })
    res.send(products)
  })
}
const getById = (req, res) => {
  Product.findById(req.params.id, (err, products) => {
    if (err)
      res.send({ msg: `Cant't get the product ${req.params.id}`, error: err })
    res.send(products)
  })
}
const insert = (req, res) => {
  const product = new Product({
    _id: req.body.id,
    photo: req.body.photo,
    title: req.body.title,
    description: req.body.description,
    availableSize: req.body.availableSize,
    price: req.body.price
  })
  product.save(err => {
    if (err) res.send({ msg: 'Cant`t save the product', error: err })
    res.send({ msg: 'product saved', data: product })
  })
}
const upsert = (req, res) => {

  Product.updateOne({ _id: req.params.id }, { ...req.body }, err => {

    if (err)
      res.send({
        msg: `Cant't upsert the product ${req.params.id}`,
        error: err
      })

    res.send({ msg: 'Product upserted' })
  })
}

const remove = (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) return res.status(500).send(err)
    res.status(200).send(doc)
  })
}

module.exports = {
  getAll,
  getById,
  insert,
  upsert,
  remove
}
