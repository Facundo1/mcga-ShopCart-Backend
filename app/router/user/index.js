const express = require('express')
const controller = require('./controller')
const functions = require('../../functions')

const router = express.Router()
const { getAll, getById, insert, upsert, remove, signIn, signUp } = controller

router.use(express.json())

router.get('/', functions.decodeToken, getAll)
router.post('/', functions.decodeToken, insert)
router.post('/signIn', signIn)
router.post('/signUp', signUp)
router.put('/:id', functions.decodeToken, upsert)
router.delete('/:id', functions.decodeToken, remove)

module.exports = router
