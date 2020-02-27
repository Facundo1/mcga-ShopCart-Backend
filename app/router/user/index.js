const express = require('express');
const controller = require('./controller');

const router = express.Router();
const { getAll, getById, insert, upsert, remove, signIn, signUp } = controller;

router.use(express.json());

router.get('/', getAll);
router.post('/', insert);
router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.put('/:id', upsert);
router.delete('/:id', remove);

module.exports = router;
