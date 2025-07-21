
import { createPost, getPost } from '../controllers/posts.controllers.js'
import express from 'express';
const router = express.Router();


router.post('/create', (req, res) => {
  console.log(req.body) 
  const id = createPost(req.body) //models.timeuuid obj
  res.send('test create')
  //TODO:
  //validation callback
  //actual processing callback
  //ya need to make some sort of interface to make the processing
  //callback be universal, something like that
});


router.get('/:id', (req, res) => {
  const processPost = (post) => {
    res.send(post)
  }
  getPost(req.params.id, processPost)
});


export default router;
