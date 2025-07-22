
import { createPost, getPost, deletePost, updatePost } from '../controllers/posts.controllers.js'
import { ResponseHandler } from '../response/responseHandler.js'
import express from 'express';
const router = express.Router();


router.post('/create', (req, res) => {
  const respHandler = new ResponseHandler(res)
  const id = createPost(req.body, respHandler.sendSuccess, respHandler.sendError)
  //TODO:
  //validation callback
  //actual processing callback
  //ya need to make some sort of interface to make the processing
  //callback be universal, something like that
});


router.get('/:id', (req, res) => {
  const respHandler = new ResponseHandler(res)
  const processPost = (post) => { respHandler.sendSuccess(200, post) }
  getPost(req.params.id, processPost, respHandler.sendError)
});

router.delete('/delete/:id', (req, res) => {
  const respHandler = new ResponseHandler(res)
  deletePost(req.params.id, respHandler.sendSuccess, respHandler.sendError)  
})

router.put('/update', (req, res) => {
  const respHandler = new ResponseHandler(res)
  updatePost(req.body.id, respHandler.sendSuccess, respHandler.sendError, req.body)
})


export default router;
