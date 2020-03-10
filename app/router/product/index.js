const express = require('express')
const controller = require('./controller')
const functions = require('../../functions')

const router = express.Router()
const { getAll, getById, insert, upsert, remove } = controller

router.use(express.json())

router.get('/', getAll)
router.get('/:id', functions.decodeToken, getById)
router.post('/', functions.decodeToken, insert)
router.put('/:id', functions.decodeToken, upsert)
router.delete('/:id', functions.decodeToken, remove)

module.exports = router
