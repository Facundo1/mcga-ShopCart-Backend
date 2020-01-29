const express = require('express')
const controller = require('./controller')
const auth = require('../../authentication/auth')

const router = express.Router()
const  {
  getAll,
  getById,
  post,
  put,
  remove
} = controller

router.use(express.json())

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', post)
router.post('/:id', put)
router.delete('/:id', remove)

module.exports = router