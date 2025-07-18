//getting error ReferenceError: require is not defined in ES module scope, you can use import instead
//const express = require('express')

import express from 'express'
import models from 'express-cassandra'
import initDbTable from './db/cassandra.js'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send({status: 'ok'})
})


initDbTable()

app.listen(port, () => {
  console.log(`MingBlog backend running on port ${port}`)
})

