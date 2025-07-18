import express from 'express'
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

