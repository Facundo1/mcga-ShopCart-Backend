const User = require('../../models/users')
const sha256 = require('sha256')
const jwt = require('jsonwebtoken')
const functions = require('../../functions')

const getAll = (req, res) => {
    User.find({},{password: 0}, (err,users) => {
        if (err) res.send({msg: 'can`t get the user list', error: err})
        res.send(users)
    })
}

const getById = (req,res) => {
    User.findById({_id: req.params.id}, (err,users) => {
      console.log(err,users)
        if(err) res.send({msg: `Cant't get the user ${req.params.id}`, error: err})
        res.send(users)
    })
}

const insert = (req, res) => { 
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password:  sha256(req.body.password),
      address: req.body.address
    })
    user.save((err) => {
      if (err) res.send({msg: 'Cant`t save the user', error: err})
      res.send(user)
    })
  }

  const signUp = (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password:  sha256(req.body.password),
      address: req.body.address
    })
    user.save((err) => {
      if (err) res.status(500).send({msg: `Can't save the user: ${err}`})
      res.status(200).json({token: functions.createToken(user)})
    })
  }
  
  const signIn = (req, res) => {
    const { name, password } = req.body
    User.findOne(
      { name, password: sha256(password) },
      { password: 0 },
      (err, user) => {
      if (err) return res.status(500).send({ msg: 'Server Error', error: err })
      if (!user) return res.status(404).send({ msg: 'Invalid Email or password', error: err })
      req.user= user
      res.status(200).json({messagge: 'you are logged', token: functions.createToken(user), user: user.id})
    })
  }
  
  const upsert  = (req, res) => {
    User.updateOne({_id: req.params.id}, {...req.body}, (err) => {
      if (err) res.send({msg: `Cant't upsert the user ${req.params.id}`, error: err})
      res.send('User upserted')
    })
  }  
  
  const remove = (req, res) => {
    User.deleteOne({_id: req.params.id}, (err) => {
      if (err) res.send({msg: `Cant't delete the user ${req.params.id}`, error: err})
      res.send('User deleted')
    }) 
  }
  
  module.exports = {
    getAll,
    getById,
    insert,
    upsert,
    remove,
    signIn, 
    signUp
  }