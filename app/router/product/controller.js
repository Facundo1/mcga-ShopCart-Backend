const Product = require('../../models/products')


const getAll = (req , res ) => {
  Product.find({},(err,products) => {
    if (err) res.send({msg: 'can`t get the user list', error: err})
    res.send(products)
  })
}
const getById = (req , res ) => {
  Product.findById(req.params.id, (err,products) => {
    if(err) res.send({msg: `Cant't get the product ${req.params.id}`, error: err})
    res.send(products)
})
}
const insert = (req, res) => {
  const product = new Product({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    availableSizes: req.body.availableSizes,
    price: req.body.price,
  
  })
   product.save((err) => {
    if (err) res.send({msg: 'Cant`t save the product', error: err})
    res.send('product saved')
  })
}
const upsert = (req , res ) => {
  Product.updateOne({name: req.params.name}, {...req.body}, (err) => {
    if (err) res.send({msg: `Cant't upsert the product ${req.params.id}`, error: err})
    res.send('Product upserted')
  })
}
const remove =(req , res ) => {
 Product.deleteOne({name: req.params.name}, (err) => {
   if (err) res.send({msg:`Cant't delete the product ${req.params.id}`, error: err})
   res.send('product deleted')
 })
}

module.exports =  {
   getAll,
   getById,
   insert,
   upsert,
   remove
}