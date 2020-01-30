const express = require('express')
const controller = require('./controller')


const router = express.Router()
const  {
  getAll,
  getById,
  insert,
  upsert,
  remove
} = controller

router.use(express.json())

router.get('/', getAll)
router.get('/:id', getById)
router.post('/', insert)
router.put('/:id', upsert)
router.delete('/:id' , remove)

module.exports = router