const express = require ('express')
const mongoose = require ('mongoose')

const app = express()
const port = 5000

const mongoDBURL = require('./dbconfig/connectionstring.config')

app.listen( port, () => {
    console.log(`Example app listening on port ${port}!`)
})