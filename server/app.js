import express from 'express'
import cors from 'cors'
import { initDbTable } from './db/cassandra.js'
//import router/s
import postsRouter from './routes/posts.routes.js'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send({status: 'ok'})
})

initDbTable()

//body parsing middleware to access req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//add the router/s via app.use()
app.use('/posts', postsRouter)

app.listen(port, () => {
  console.log(`MingBlog backend running on port ${port}`)
})

