const Product = require('../../models/products')
const validateProductInput = require("../../validations/products")

router.getAll('/', function(req, res) {
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
})

router.get('/:id', function (req, res) {
  Product.findOne({id: req.params.id}).then( product => {
    if(product) {
      let products = []
      products.push(product)
      res.status(200).json(products);
    }
    else {
      res.status(400).json({error:'This product does not exist'})
    }
  })
})

router.post('/', upload.single('image'), function (req, res) {
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
            description: req.body.description,
            image: req.file.filename  //just save the image path so i can get it later
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
})

router.put('/:id', upload.single('image'), function (req, res) {
  //Form validation
  const { errors, isValid } = validateProductInput(req.body)
  // Check validation
  if (!isValid) {
    res.status(400).json({errors})
  }
  else {
    Product.findOneAndUpdate({id:req.body.id}, {$set: {name:req.body.name, description:req.body.description, price:req.body.price, image:req.file.filename}}).then(product => {
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
})

router.delete('/:id',function (req, res) {
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
})


module.exports = {
    getAll,
    getById,
    insert,
    upsert,
    update,
    remove,
    signIn, 
    signUp
  }