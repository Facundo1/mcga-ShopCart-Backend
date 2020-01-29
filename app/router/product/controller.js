const Product = require('../../models/products')


const getAll = (req , res ) => {
  res.send({Product});
}
const getById = (req , res ) => {
   const product = Product.find(product => product.id == req.params.id);
   if(product == null){
       res.send('product doesn´t exist');
   }
   else{
       res.send(product);
   }
}

const insert = (req, res) => {
  const product = new Product({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  })

   product.save((err) => {
    if (err) res.send({msg: 'Cant`t save the product', error: err});
    res.send('product saved');
  })
}
const upsert = (req , res ) => {
   const product = Product.find(product => product.id == req.params.id);
   if(product == null) {
       res.send('product doesn`t exist');
   }
   else{
       Product.splice(Product.id-1,1,req.body);
       res.send(`product: ${Product} upsert`);
   }
}
const update = (req , res ) => {
   const product = Product.find(product => product.id == req.params.id);
   if(product == null){
      res.send('product doesn´t exist');
   }
   else{
       product[Object.keys(req.body)] = req.body[Object.keys(req.body)];
       res.send(product);
   }
}
const remove =(req , res ) => {
   const product = Product.find(product => product.id == req.params.id);
   if(product == null){
       res.send('product dosn`t exist');
   }
   else{
       product.splice(product.id-1,1);
       res.send(`product: ${req.params.id} remove`);
   }
}

module.exports =  {
   getAll,
   getById,
   insert,
   upsert,
   update,
   remove
}