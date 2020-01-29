const Product = require('../../models/products')
const validateProductInput = require("../../validations/products")

const getAll =  (req, res) => {
  Product.find({}).then(products => {
      if(products)
        res.status(200).json(products)
      else {
        res.status(400).json({error:'Product not found'})
      }
    })
  .catch(error => {
    res.status(400).json({error:error})
  })
}

const getById =  (req, res) => {
  Product.findById({id: req.params.id}).then( product => {
    if(product) {
      let products = []
      products.push(product)
      res.status(200).json(products);
    }
    else {
      res.status(400).json({error:'This product does not exist'})
    }
  })
}

const post = (req, res) => {
  // Form validation
  const { errors, isValid } = validateProductInput(req.body)
  // Check validation
  if (!isValid) {
    return res.status(400).json({error:errors})
  }
  else {
    let newId = 0;
    Product.find().limit(1).sort({$natural:-1}).then( product => {
      if(isEmpty(product)) {
        newId = (newId + 1)
      }
      else {
        newId = (product[0].id + 1)
      }
    })
    .catch(error => {
      res.status(400).json({error:error})
    })
    .then(() => {
        Product.findOne({name:req.body.name}).then(product => {
        if(product === null) {
          const newProduct = new Product({
            id: newId,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
          })
          newProduct.save().then(product => res.json(product)).catch(err => console.log(err))
        }
        else {
            res.status(400).json({error:'The product already exist'})
          }
        })
      })
      .catch(error => {
        res.status(400).json({error: error})
      })
  }
}

 const put = (req, res) => {
  //Form validation
  const { errors, isValid } = validateProductInput(req.body)
  // Check validation
  if (!isValid) {
    res.status(400).json({errors})
  }
  else {
    Product.findOneAndUpdate({id:req.body.id}, {$set: {name:req.body.name, description:req.body.description, price:req.body.price}}).then(product => {
      if(product) {
        product.save()
        Product.find({}).then(products => {
          res.status(200).json(products)
        })
        .catch(error => {
            res.status(400).json({error:error})
        })
      }
      else {
        res.status(400).json({message:'An error has ocurred'})
      }
    })
    .catch(error => {
      res.status(400).json({error:error})
    })
   }
}

const remove = (req, res) => {
  Product.findOneAndDelete({id:req.params.id}).then( product => {
    if(product) {
      res.status(200).json(product)
    }
    else {
      res.status(400).json({error:error})
    }
  })
  .catch(error => {
    res.status(400).json({error:error})
    }
  )
}


module.exports = {
    getAll,
    getById,
    post,
    put,
    remove
  }